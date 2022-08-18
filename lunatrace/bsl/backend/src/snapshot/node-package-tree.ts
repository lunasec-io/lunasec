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
import { randomUUID } from 'crypto';
import path from 'path';

import { buildDepTreeFromFiles, PkgTree } from 'snyk-nodejs-lockfile-parser-lunatrace-fork';
import { DepTreeDep } from 'snyk-nodejs-lockfile-parser-lunatrace-fork/dist/parsers';

import pool from '../db-pool';
import {
  Build_Dependency_Relationship_Insert_Input,
  Package_Constraint,
  Package_Release_Constraint,
  Package_Release_Update_Column,
  Package_Update_Column,
} from '../hasura-api/generated';
import { newError, newResult } from '../utils/errors';
import { findFilesMatchingFilter } from '../utils/filesystem-utils';
import { log } from '../utils/log';
import { notEmpty } from '../utils/predicates';
import { convertNamedInsertValues } from '../utils/sql';

interface CollectedPackageTree {
  lockFile: string;
  pkgTree: PkgTree;
}

export async function collectPackageTreesFromDirectory(repoDir: string): Promise<CollectedPackageTree[]> {
  const lockFilePaths = await findFilesMatchingFilter(repoDir, (_directory, entryName) => {
    return /package-lock\.json|yarn\.lock/.test(entryName);
  });

  const nonDependencyLockFilePaths = lockFilePaths.filter((p) => !/\/node_modules\//.test(p));

  return Promise.all(
    nonDependencyLockFilePaths.map(async (lockFile) => {
      const { dir, base } = path.parse(lockFile);
      // Calls our fork of the snyk library
      const pkgTree = await buildDepTreeFromFiles(dir, 'package.json', base, true);
      return {
        lockFile,
        pkgTree,
      };
    })
  );
}

interface FlattenedDependency {
  id: string;
  dependency: DepTreeDep;
  parentId: string | null;
}

function flattenPkgTree(pkgTree: PkgTree) {
  const flatDeps: FlattenedDependency[] = [];

  const recurseTree = (dep: DepTreeDep, parentId: string | null): void => {
    const newId = randomUUID();
    const newDep = { id: newId, dependency: dep, parentId };
    flatDeps.push(newDep);
    if (dep.dependencies) {
      Object.values(dep.dependencies).forEach((subDep) => {
        recurseTree(subDep, newId);
      });
    }
  };
  Object.values(pkgTree.dependencies).forEach((rootDep) => recurseTree(rootDep, null));
  return flatDeps;
}

function mapPackageTreeToBuildDependencyRelationships(
  buildId: string,
  collectedPackageTree: CollectedPackageTree
): Build_Dependency_Relationship_Insert_Input[] {
  const flattenedDependencies = flattenPkgTree(collectedPackageTree.pkgTree);
  return flattenedDependencies
    .map((entry): Build_Dependency_Relationship_Insert_Input | null => {
      const { id, dependency, parentId } = entry;
      if (!dependency.version || !dependency.name) {
        return null;
      }

      if (!dependency.range) {
        log.warn('failed to insert dependency, range is not defined', {
          dependency,
        });
        return null;
      }

      return {
        id,
        build_id: buildId,
        depended_by_relationship_id: parentId,
        project_path: collectedPackageTree.lockFile,
        labels: dependency.labels,
        range: dependency.range,
        release: {
          data: {
            version: dependency.version,
            package: {
              data: {
                name: dependency.name,
                package_manager: 'npm',
                // TODO (cthompson) theoretically we have the information to fill this in, how do we get this from a PkgTree?
                custom_registry: '',
              },
            },
          },
        },
      };
    })
    .filter(notEmpty);
}

export async function snapshotPinnedDependencies(buildId: string, repoDir: string) {
  const pkgTrees = await collectPackageTreesFromDirectory(repoDir);

  const buildDependencyRelationships = pkgTrees
    .map((pkgTree) => mapPackageTreeToBuildDependencyRelationships(buildId, pkgTree))
    .flat();

  log.info('generated package tree for node dependencies', {
    count: buildDependencyRelationships.length,
    repoDir,
  });

  const seenIds: Record<string, boolean> = {};
  const buildDependencyRelationshipValues: Record<string, any>[] = buildDependencyRelationships.map((r) => {
    const release = r.release?.data;
    if (!release) {
      log.warn('release is not defined', {
        buildDependencyRelationship: r,
      });
      throw new Error('release is not defined');
    }

    const releasePackage = release.package?.data;
    if (!releasePackage) {
      log.warn('release package is not defined', {
        buildDependencyRelationship: r,
      });
      throw new Error('release package is not defined');
    }
    return {
      package_name: releasePackage.name,
      package_manager: releasePackage.package_manager,
      package_version: release.version,
      relationship_id: r.id,
      build_id: r.build_id,
      depended_by_relationship_id: r.depended_by_relationship_id,
      project_path: r.project_path,
      labels: r.labels,
      range: r.range,
    };
  });

  const insertBuildDependencyRelationshipQuery = `
      WITH referenced_package AS (
          INSERT INTO package.package ("name", "package_manager", "custom_registry")
              VALUES (:package_name, :package_manager, '')
              ON CONFLICT ON CONSTRAINT package_package_manager_custom_registry_name_idx DO NOTHING
              RETURNING id
      ), release AS (
          INSERT INTO package.release ("package_id", "version")
              SELECT id, :package_version
              FROM referenced_package
              ON CONFLICT ON CONSTRAINT release_package_id_version_idx DO NOTHING
              RETURNING id
      )
      INSERT INTO public.build_dependency_relationship ("id", "build_id", "depended_by_relationship_id", "release_id", "project_path", "labels", "range")
      SELECT :relationship_id, :build_id, :depended_by_relationship_id, id, :project_path, :labels, :range
      FROM release
  `;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const values of buildDependencyRelationshipValues) {
      await client.query(convertNamedInsertValues(insertBuildDependencyRelationshipQuery, values));
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    const error = e as Error;
    log.error('failed to insert build dependency relationships into database', {
      error,
    });
    return newError(error.message);
  } finally {
    client.release();
  }

  // TODO (cthompson) chunks are used to prevent a large insert. A single SQL insert would be more performant/reliable.
  // const chunkSize = 5000;
  // for (let i = 0; i < buildDependencyRelationships.length; i += 1) {
  //   if (i % chunkSize !== 0) {
  //     continue;
  //   }
  //
  //   const chunk = buildDependencyRelationships.slice(i, i + chunkSize);
  //   log.info('inserting build dependency relationships', {
  //     chunkSize: chunk.length,
  //   });
  //
  //   const resp = await catchError(
  //     hasura.InsertBuildDependencyRelationships({
  //       objects: chunk,
  //       on_conflict: {
  //         constraint: Build_Dependency_Relationship_Constraint.BuildDependencyRelationshipPkey,
  //         update_columns: [Build_Dependency_Relationship_Update_Column.Id],
  //       },
  //     })
  //   );
  //   if (threwError(resp)) {
  //     log.error('failed to insert build dependency relationships', {
  //       idx: i,
  //       chunkSize,
  //       error: hasuraErrorMessage(resp as unknown as HasuraError),
  //     });
  //     return newError(resp.message);
  //   }
  //   log.info('inserted build dependency relationships', {
  //     resp,
  //     idx: i,
  //     chunkSize,
  //   });
  // }
  return newResult(undefined);
}
