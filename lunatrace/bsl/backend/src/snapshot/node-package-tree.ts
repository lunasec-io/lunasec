/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import path from 'path';

import { buildDepTreeFromFiles, PkgTree } from 'snyk-nodejs-lockfile-parser-lunatrace-fork';
import { DepTreeDep } from 'snyk-nodejs-lockfile-parser-lunatrace-fork/dist/parsers';

import {
  DependencyGraphNode,
  dfsGenerateMerkleTreeFromDepTree,
} from '../database/dependency-relationship-dag-calculator';
import { hasura } from '../hasura-api';
import {
  Build_Dependency_Relationship_Constraint,
  Build_Dependency_Relationship_Insert_Input,
  Build_Dependency_Relationship_Update_Column,
  Package_Constraint,
  Package_Release_Constraint,
  Package_Release_Update_Column,
  Package_Update_Column,
} from '../hasura-api/generated';
import { HasuraError } from '../types/hasura';
import { newError, newResult } from '../utils/errors';
import { findFilesMatchingFilter } from '../utils/filesystem-utils';
import { hasuraErrorMessage } from '../utils/hasura';
import { log } from '../utils/log';
import { notEmpty } from '../utils/predicates';
import { catchError, threwError } from '../utils/try';

interface PackageDependenciesWithGraphAndMetadata {
  rootNode: DependencyGraphNode;
  labels?: {
    [key: string]: string | undefined;
    scope?: 'dev' | 'prod';
    pruned?: 'cyclic' | 'true';
    missingLockFileEntry?: 'true';
  };
  name?: string;
  range?: string | null;
  version?: string;
}

interface CollectedPackageTree {
  lockFilePath: string;
  dependencies: PackageDependenciesWithGraphAndMetadata[];
}

export async function collectPackageGraphsFromDirectory(repoDir: string): Promise<CollectedPackageTree[]> {
  const lockFilePaths = await findFilesMatchingFilter(repoDir, (_directory, entryName) => {
    return /package-lock\.json|yarn\.lock$/.test(entryName);
  });

  const nonDependencyLockFilePaths = lockFilePaths.filter((p) => !/\/node_modules\//.test(p));

  return Promise.all(
    nonDependencyLockFilePaths.map(async (lockFilePath) => {
      const { dir, base } = path.parse(lockFilePath);
      // Calls our fork of the Snyk library
      const pkgTree = await buildDepTreeFromFiles(dir, 'package.json', base, true);

      const pkgDependenciesWithGraphAndMetadata = Object.values(pkgTree.dependencies).map((pkg) => {
        return {
          rootNode: dfsGenerateMerkleTreeFromDepTree(pkg),
          labels: pkg.labels,
          name: pkg.name,
          range: pkg.range,
          version: pkg.version,
        };
      });

      // Remove the repo path from the returned lockfile path
      const truncatedLockfilePath = lockFilePath.replace(new RegExp('^' + repoDir), '');

      const lockFilePathWithLeadingSlash = truncatedLockfilePath.startsWith('/')
        ? truncatedLockfilePath
        : `/${truncatedLockfilePath}`;

      return {
        lockFilePath: lockFilePathWithLeadingSlash,
        dependencies: pkgDependenciesWithGraphAndMetadata,
      };
    })
  );
}

function mapPackageGraphToBuildDependencyRelationships(
  rootNode: DependencyGraphNode
): Build_Dependency_Relationship_Insert_Input[] {
  const dependencyRelationshipInsertQueries: Build_Dependency_Relationship_Insert_Input[] = [];

  function recursePackageGraph(node: DependencyGraphNode) {
    const insertQuery = createBuildDependencyInsertQueryData(node);

    node.children.forEach((node) => recursePackageGraph(node));

    if (insertQuery) {
      dependencyRelationshipInsertQueries.push(insertQuery);
    }
  }

  recursePackageGraph(rootNode);

  return dependencyRelationshipInsertQueries;
}

function createBuildDependencyInsertQueryData(
  node: DependencyGraphNode
): Build_Dependency_Relationship_Insert_Input | null {
  const { packageData, parent } = node;

  if (!packageData.version || !packageData.name) {
    return null;
  }

  // TODO: Because of "releaseId", do we actually need this still?
  /*if (!packageData.range) {
    log.warn('failed to insert dependency, range is not defined', {
      packageData,
    });
    return null;
  }*/

  return {
    id: node.treeHashId,
    depended_by_relationship_id: parent?.treeHashId,
    release: {
      data: {
        version: packageData.version,
        package: {
          data: {
            name: packageData.name,
            package_manager: 'npm',
            // TODO (cthompson) theoretically we have the information to fill this in, how do we get this from a PkgTree?
            custom_registry: '',
          },
          on_conflict: {
            constraint: Package_Constraint.PackagePackageManagerCustomRegistryNameIdx,
            update_columns: [
              Package_Update_Column.Name,
              Package_Update_Column.PackageManager,
              Package_Update_Column.CustomRegistry,
            ],
          },
        },
      },
      on_conflict: {
        constraint: Package_Release_Constraint.ReleasePackageIdVersionIdx,
        update_columns: [Package_Release_Update_Column.Version],
      },
    },
  };
}

// TODO: Nuke this because it's just a stub
interface Build_Dependency_Insert_Input {
  build_id: string;
  // TODO: Figure out if this is good enough or if we need to push the root node instead
  build_dependency_relationship_id: string;
  range?: string | null;
  labels?: {
    [key: string]: string | undefined;
    scope?: 'dev' | 'prod';
    pruned?: 'cyclic' | 'true';
    missingLockFileEntry?: 'true';
  };
  project_path: string;
}

export async function snapshotPinnedDependencies(buildId: string, repoDir: string) {
  const pkgGraphs = await collectPackageGraphsFromDirectory(repoDir);

  const hasuraInsertQueries: DependencyInsertData[] = pkgGraphs.map(({ lockFilePath, dependencies }) => {
    const buildDependencyInsertQueries: Build_Dependency_Insert_Input[] = [];

    const dependencyRelationshipInsertQueries = dependencies
      .map((dep) => {
        buildDependencyInsertQueries.push({
          build_id: buildId,
          // TODO: Figure out if this is good enough or if we need to push the root node instead
          build_dependency_relationship_id: dep.rootNode.treeHashId,
          range: dep.range,
          labels: dep.labels,
          project_path: lockFilePath,
        });

        return mapPackageGraphToBuildDependencyRelationships(dep.rootNode);
      })
      .flat();

    return {
      buildDependencyInsertQueries,
      dependencyRelationshipInsertQueries,
    };
  });

  log.info('generated package tree for node dependencies', {
    count: hasuraInsertQueries.length,
    repoDir,
  });

  await InsertDependenciesIntoHasura(hasuraInsertQueries);

  return newResult(undefined);
}

interface DependencyInsertData {
  buildDependencyInsertQueries: Build_Dependency_Insert_Input[];
  dependencyRelationshipInsertQueries: Build_Dependency_Relationship_Insert_Input[];
}

async function InsertDependenciesIntoHasura(queries: DependencyInsertData[]) {
  // TODO (cthompson) chunks are used to prevent a large insert. A single SQL insert would be more performant/reliable.
  const chunkSize = 5000;
  for (let i = 0; i < queries.length; i += 1) {
    if (i % chunkSize !== 0) {
      continue;
    }

    const chunk = hasuraInsertQueries.slice(i, i + chunkSize);
    log.info('inserting build dependency relationships', {
      chunkSize: chunk.length,
    });

    const resp = await catchError(
      hasura.InsertBuildDependencyRelationships({
        objects: chunk,
        on_conflict: {
          constraint: Build_Dependency_Relationship_Constraint.BuildDependencyRelationshipPkey,
          update_columns: [Build_Dependency_Relationship_Update_Column.Id],
        },
      })
    );
    if (threwError(resp)) {
      log.error('failed to insert build dependency relationships', {
        idx: i,
        chunkSize,
        error: hasuraErrorMessage(resp as unknown as HasuraError),
      });
      return newError(resp.message);
    }
    log.info('inserted build dependency relationships', {
      resp,
      idx: i,
      chunkSize,
    });
  }
}

async function InsertBuildDependencyIntoHasura(inputData: Build_Dependency_Insert_Input): Promise<
  | {
      error: true;
      msg: string;
    }
  | { error: false }
> {
  const resp = await catchError(
    hasura.InsertBuildDependency({
      ...inputData,
      // TODO: Make this on_conflict resolution actually resolve
      on_conflict: {
        constraint: Build_Dependency_Relationship.BuildDependencyRelationshipPkey,
        update_columns: [Build_Dependency_Relationship_Update_Column.Id],
      },
    })
  );

  if (threwError(resp)) {
    log.error('failed to insert build dependency relationships', {
      idx: i,
      chunkSize,
      error: hasuraErrorMessage(resp as unknown as HasuraError),
    });
    return newError(resp.message);
  }

  log.info('inserted build dependency relationships', {
    resp,
    idx: i,
    chunkSize,
  });

  return {
    error: false,
  };
}
