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

import { buildDepTreeFromFiles, PkgTree } from 'nodejs-lockfile-parser';
import { DepTreeDep } from 'nodejs-lockfile-parser/dist/parsers';

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
import { walk } from '../utils/fs';
import { log } from '../utils/log';
import { notEmpty } from '../utils/predicates';

export async function collectPackageTreesFromDirectory(repoDir: string) {
  const lockFileRegex = new RegExp('package-lock\\.json|yarn\\.lock');
  const lockFilePaths = walk(repoDir, (path, name) => lockFileRegex.test(name));

  return await Promise.all(
    Array.from(lockFilePaths, async (lockFilePath) => {
      const { dir, base } = path.parse(lockFilePath);
      return await buildDepTreeFromFiles(dir, 'package.json', base, true);
    })
  );
}

interface FlattenedDependency {
  id: string;
  dependency: DepTreeDep;
  parentId?: string;
}

function depDependencies(dep: DepTreeDep, parentId?: string): FlattenedDependency[] {
  // if these are root dependencies then do not generate a parent identifier, there is none.
  // this will help identify which are root level dependencies in the database.
  const id = randomUUID();
  return Object.values(dep.dependencies || []).map((d) => ({ id, dependency: d, parentId }));
}

function flattenPkgTree(pkgTree: PkgTree) {
  const stack = [...depDependencies(pkgTree)];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (!next) {
      break;
    }

    stack.push(...depDependencies(next.dependency, next.id));
    res.push(next);
  }
  // reverse to restore input order
  return res;
}

function mapPackageTreeToBuildDependencyRelationships(
  buildId: string,
  pkgTree: PkgTree
): Build_Dependency_Relationship_Insert_Input[] {
  const flattenedDependencies = flattenPkgTree(pkgTree);
  return flattenedDependencies
    .map((entry): Build_Dependency_Relationship_Insert_Input | null => {
      const { id, dependency, parentId } = entry;
      if (!dependency.version || !dependency.name) {
        return null;
      }

      return {
        /*
         TODO (cthompson) we are generating the ids for the database here. This avoids a roundtrip from the server
         so we can have an id on hand for `depended_by_relationship_id` but could result in an insertion error.
         What is the best way to recover from this? Theoretically, on error, we can
         regenerate the graphql insertion query which would create new UUIDs which would be incredibly unlikely to have another
         collision. For now, this is most likely fine and shouldn't result in any issues, the planets need to align for this to
         be a problem atm.
         */
        id,
        build_id: buildId,
        depended_by_relationship_id: parentId,
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
        labels: dependency.labels,
        range: dependency.range,
      };
    })
    .filter(notEmpty);
}

export async function snapshotPinnedDependencies(buildId: string, repoDir: string) {
  const pkgTrees = await collectPackageTreesFromDirectory(repoDir);

  const buildDependencyRelationships = pkgTrees
    .map((pkgTree) => mapPackageTreeToBuildDependencyRelationships(buildId, pkgTree))
    .flat();

  log.info('generated package tree for pinned dependencies', {
    count: buildDependencyRelationships.length,
  });

  const chunkSize = 5000;
  for (let i = 0; i < buildDependencyRelationships.length; i += 1) {
    if (i % chunkSize !== 0) {
      continue;
    }

    const chunk = buildDependencyRelationships.slice(i, i + chunkSize);
    log.info('inserting build dependency relationships', {
      chunkSize: chunk.length,
    });

    const resp = await hasura.InsertBuildDependencyRelationships({
      objects: chunk,
      on_conflict: {
        constraint: Build_Dependency_Relationship_Constraint.BuildDependencyRelationshipPkey,
        update_columns: [Build_Dependency_Relationship_Update_Column.Id],
      },
    });
    log.info('inserted build dependency relationships', {
      resp,
    });
  }
}
