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

import { ITask } from 'pg-promise';
import { buildDepTreeFromFiles, PkgTree } from 'snyk-nodejs-lockfile-parser-lunatrace-fork';
import { DepTreeDep } from 'snyk-nodejs-lockfile-parser-lunatrace-fork/dist/parsers';

import { db, pgp } from '../database/db';
import {
  DependencyGraphNode,
  dfsGenerateMerkleTreeFromDepTree,
} from '../database/dependency-relationship-dag-calculator';
import { findFilesMatchingFilter } from '../utils/filesystem-utils';
import { log } from '../utils/log';
import { notEmpty } from '../utils/predicates';

interface PackageDependenciesWithGraphAndMetadata {
  node: DependencyGraphNode;
  labels?: {
    [key: string]: string | undefined;
    scope?: 'dev' | 'prod';
    pruned?: 'cyclic' | 'true';
    missingLockFileEntry?: 'true';
  };
  name?: string;
  range?: string;
  version?: string;
}

interface CollectedPackageTree {
  lockFilePath: string;
  error?: string;
  dependencies: PackageDependenciesWithGraphAndMetadata[];
  packageManager?: string;
  lockfileVersion?: number;
  rootTreeHashID?: string;
}

interface ManifestDependencyEdge {
  parent_id: string;
  child_id: string;
}

function sortEdges(a: ManifestDependencyEdge, b: ManifestDependencyEdge): number {
  if (a.parent_id < b.parent_id) {
    return -1;
  }

  if (a.parent_id > b.parent_id) {
    return 1;
  }

  if (a.child_id < b.child_id) {
    return -1;
  }

  if (a.child_id > b.child_id) {
    return 1;
  }

  return 0;
}

export async function collectPackageGraphsFromDirectory(
  repoDir: string,
  rootUniqueId?: string,
  codeUrl?: string
): Promise<CollectedPackageTree[]> {
  const lockFilePaths = await findFilesMatchingFilter(repoDir, (_directory, entryName) => {
    return /package-lock\.json|yarn\.lock$/.test(entryName);
  });

  const nonDependencyLockFilePaths = lockFilePaths.filter((p) => !/\/node_modules\//.test(p));

  return Promise.all(
    nonDependencyLockFilePaths.map(async (lockFilePath) => {
      const { dir, base } = path.parse(lockFilePath);

      // Remove the repo path from the returned lockfile path
      const truncatedLockfilePath = lockFilePath.replace(new RegExp('^' + repoDir), '');

      const lockFilePathWithLeadingSlash = truncatedLockfilePath.startsWith('/')
        ? truncatedLockfilePath
        : `/${truncatedLockfilePath}`;

      let pkgTree;
      try {
        // Calls our fork of the Snyk library
        pkgTree = await buildDepTreeFromFiles(dir, 'package.json', base, true, false);
      } catch (e) {
        log.error('failed to parse a lockfile pair', {
          lockFilePathWithLeadingSlash,
          e,
        });
        return {
          lockFilePath: lockFilePathWithLeadingSlash,
          error: 'Unable to process lockfile',
          dependencies: [],
        };
      }

      // This value is set to false by the library when there are zero dev dependencies
      const prodOrDevLabel = pkgTree.hasDevDependencies ? 'dev' : 'prod';

      // Add the unique id to the version of the root node if requested so it has a unique key in the db.
      if (rootUniqueId) {
        pkgTree.version = `${pkgTree.version}-${rootUniqueId}`;
      }

      const depToGraphAndMetadata = (pkg: PkgTree | DepTreeDep) => {
        return {
          node: dfsGenerateMerkleTreeFromDepTree(pkg),
          // If there is nothing in the labels, then we know that it is a prod dependency
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          labels: pkg.labels ?? ({ scope: prodOrDevLabel } as any),
          name: pkg.name,
          range: pkg.range || pkg.version,
          version: pkg.version,
        };
      };

      const rootDependencyWithGraphAndMetadata = depToGraphAndMetadata(pkgTree);
      rootDependencyWithGraphAndMetadata.node.mirroredBlobUrl = codeUrl;

      const dependenciesWithGraphAndMetadata = Object.values(pkgTree.dependencies).map(depToGraphAndMetadata);

      return {
        lockFilePath: lockFilePathWithLeadingSlash,
        dependencies: [rootDependencyWithGraphAndMetadata, ...dependenciesWithGraphAndMetadata],
        packageManager: pkgTree?.meta?.packageManager,
        lockfileVersion: pkgTree?.meta?.lockfileVersion,
        rootTreeHashID: rootDependencyWithGraphAndMetadata.node.treeHashId,
      };
    })
  );
}

function packageGraphToUniqueDependencyNodes(rootNode: DependencyGraphNode): Map<string, DependencyGraphNode> {
  const uniqueDependencyMap: Map<string, DependencyGraphNode> = new Map<string, DependencyGraphNode>();

  function recursePackageGraph(node: DependencyGraphNode) {
    node.children.forEach((node) => recursePackageGraph(node));

    uniqueDependencyMap.set(node.treeHashId, node);
  }

  recursePackageGraph(rootNode);

  return uniqueDependencyMap;
}

async function upsertAndGetPackageId<Ext>(
  t: ITask<Ext>,
  name: string,
  packageManager: string,
  customRegistry: string,
  internal?: boolean
) {
  const selectPackageIdQuery = `SELECT id FROM package.package WHERE name = $1 AND package_manager = $2 AND custom_registry = $3`;

  const packageId = await t.oneOrNone<{ id: string }>(selectPackageIdQuery, [name, packageManager, customRegistry]);

  if (packageId && packageId.id) {
    return packageId.id;
  }

  const newPackageId = await t.oneOrNone<{ id: string }>(
    `INSERT INTO package.package (name, package_manager, custom_registry, internal)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT DO NOTHING
           RETURNING id`,
    [name, packageManager, customRegistry, internal]
  );

  if (newPackageId && newPackageId.id) {
    return newPackageId.id;
  }

  return (await t.one<{ id: string }>(selectPackageIdQuery, [name, packageManager, customRegistry])).id;
}

async function getPackageReleaseId<Ext>(t: ITask<Ext>, packageId: string, version: string, mirrored_blob_url?: string) {
  const selectPackageReleaseIdQuery = `SELECT id FROM package.release WHERE package_id = $1 AND version = $2`;

  const packageReleaseId = await t.oneOrNone<{ id: string }>(selectPackageReleaseIdQuery, [packageId, version]);

  if (packageReleaseId && packageReleaseId.id) {
    return packageReleaseId.id;
  }

  const newPackageReleaseId = await t.oneOrNone<{ id: string }>(
    `INSERT INTO package.release (package_id, version, mirrored_blob_url)
             VALUES ($1, $2, $3)
             ON CONFLICT (package_id, version) DO UPDATE
             SET mirrored_blob_url=excluded.mirrored_blob_url
             RETURNING id`,
    [packageId, version, mirrored_blob_url]
  );

  if (newPackageReleaseId && newPackageReleaseId.id) {
    return newPackageReleaseId.id;
  }

  return (await t.one<{ id: string }>(selectPackageReleaseIdQuery, [packageId, version])).id;
}

async function insertNodesToDatabase<Ext>(
  t: ITask<Ext>,
  queryData: DependencyGraphNode[],
  projectId: string
): Promise<void> {
  if (queryData.length === 0) {
    return;
  }

  // Define set of columns, creating only once (statically) and then reused to cache for performance
  const manifestDependencyNodeColumns = new pgp.helpers.ColumnSet(['id', 'labels', 'release_id', 'range'], {
    table: 'manifest_dependency_node',
  });

  const nodeInsertData = await Promise.all(
    queryData.map(async (node) => {
      const packageData = {
        name: node.packageData.name,
        version: node.packageData.version,
        packageManager: node.packageEcosystem,
        customRegistry: node.customRegistry,
      };

      const isTopLevel = !!node.parent;

      const packageId = await upsertAndGetPackageId(
        t,
        packageData.name || '',
        packageData.packageManager,
        // top nodes should use a custom namespace per org.
        isTopLevel ? `lunatrace-internal-project-${projectId}` : packageData.customRegistry,
        // top nodes don't have a parent and are internal.
        !isTopLevel
      );

      const packageReleaseId = await getPackageReleaseId(t, packageId, packageData.version || '', node.mirroredBlobUrl);

      return {
        id: node.treeHashId,
        labels: node.packageData.labels,
        range: node.parentRange,
        release_id: packageReleaseId,
      };
    })
  );

  const nodeInsertQuery = pgp.helpers.insert(nodeInsertData, manifestDependencyNodeColumns) + ' ON CONFLICT DO NOTHING';

  await t.none(nodeInsertQuery);
}

async function insertEdgesToDatabase<Ext>(t: ITask<Ext>, queryData: ManifestDependencyEdge[]): Promise<void> {
  if (queryData.length === 0) {
    return;
  }

  const manifestDependencyEdgeColumns = new pgp.helpers.ColumnSet(['parent_id', 'child_id'], {
    table: 'manifest_dependency_edge',
  });

  const edgeInsertQuery =
    pgp.helpers.insert(queryData.sort(sortEdges), manifestDependencyEdgeColumns) + ' ON CONFLICT DO NOTHING';

  await t.none(edgeInsertQuery);
}

async function findCurrentlyKnownDependencies(query: string, manifestIds: string[]): Promise<Set<string>> {
  if (manifestIds.length === 0) {
    return new Set();
  }

  const currentlyKnownIds: Set<string> = new Set();

  for (let i = 0; i < manifestIds.length; i += 999) {
    const slice = manifestIds.slice(i, i + 999);

    if (slice.length === 0) {
      continue;
    }

    log.info(`Checking currently known dependencies (${i + slice.length}/${manifestIds.length})`, {
      length: slice.length,
    });

    const result = await db.manyOrNone<{ id: string }>(query, [slice]);

    log.info(`Added known dependencies (${i + slice.length}/${manifestIds.length})`, { length: slice.length });

    if (result) {
      for (const { id } of result) {
        currentlyKnownIds.add(id);
      }
    }
  }

  log.info(`Found known dependencies`, { length: currentlyKnownIds.size });

  return currentlyKnownIds;
}

async function insertPackageGraphsIntoDatabase(projectId: string, pkgGraphs: CollectedPackageTree[]) {
  log.info(`Inserting package graphs into database`, { length: pkgGraphs.length });

  if (pkgGraphs.length === 0) {
    return;
  }

  // TODO: Add a place for us to mark manifest files with errors in the build results.
  // Is it safe for us to display the raw error from the Snyk library, or is that a security risk?

  const uniqueRootDependencyHashes = pkgGraphs.flatMap((pkgGraph) =>
    pkgGraph.dependencies.map((pkg) => pkg.node.treeHashId)
  );

  // Remove duplicates
  const uniqueNodeRootIds = new Set(uniqueRootDependencyHashes);

  if (uniqueNodeRootIds.size === 0) {
    log.error('No unique root dependency hashes found');
    return;
  }

  log.info(`Found unique root dependency hashes`, { length: uniqueNodeRootIds.size });

  const currentlyKnownRootIds = await findCurrentlyKnownDependencies(
    `SELECT id FROM manifest_dependency_node WHERE id IN ($1:csv)`,
    Array.from(uniqueNodeRootIds).sort()
  );

  log.info(`Found known root dependency hashes`, {
    currentlyKnownRootIds: currentlyKnownRootIds.size,
    total: uniqueNodeRootIds.size,
  });

  // Allows us to hold only one copy of each node for querying later
  const dependencyNodeMap = new Map<string, DependencyGraphNode>();

  pkgGraphs.forEach((pkgGraph) => {
    pkgGraph.dependencies.forEach((pkg) => {
      if (currentlyKnownRootIds.has(pkg.node.treeHashId)) {
        return;
      }

      const dependencyMap = packageGraphToUniqueDependencyNodes(pkg.node);

      // Merge down the map to only include the unique nodes
      for (const [key, value] of dependencyMap) {
        dependencyNodeMap.set(key, value);
      }
    });
  });

  if (dependencyNodeMap.size === 0) {
    log.info(`All dependencies already known by database, skipping insert`);
    return;
  }

  log.info(`Total transitive dependency hashes to search`, { length: dependencyNodeMap.size });

  // TODO: This could be optimized by doing a breadth first search starting from the root nodes going down by subtree
  const currentlyKnownTransitiveDependencyIds = await findCurrentlyKnownDependencies(
    `SELECT id FROM manifest_dependency_node WHERE id IN ($1:csv)`,
    Array.from(dependencyNodeMap.keys()).sort()
  );

  log.info(`Found known transitive dependency hashes`, {
    currentlyKnownTransitiveDependencyIds: currentlyKnownTransitiveDependencyIds.size,
    total: dependencyNodeMap.size,
  });

  const originalDependencySize = dependencyNodeMap.size;

  // Remove the nodes that we know we don't need to insert.
  // Warning: Dragons!
  // We're mutating state which is where bugs stem from.
  // This will reduce memory usage though, so we'll allow it.
  for (const id of currentlyKnownTransitiveDependencyIds) {
    dependencyNodeMap.delete(id);
  }

  if (dependencyNodeMap.size === 0) {
    log.info(`All transitive dependencies already known by database, skipping insert`);
    return;
  }

  log.info(`Found new transitive dependency hashes to insert`, {
    newLength: dependencyNodeMap.size,
    total: originalDependencySize,
  });

  // Insert any new dependencies into the database
  await db.tx(
    {
      // Sets the performance of this transaction to not involve any types of locking for performance
      mode: new pgp.txMode.TransactionMode({
        tiLevel: pgp.txMode.isolationLevel.none,
      }),
    },
    async (t) => {
      // We need to sort these in order to help the database avoid deadlocking
      const sortedDependencyNodes = Array.from(dependencyNodeMap.values()).sort();

      // Insert the nodes in batches to avoid exceeding the maximum query values limit
      for (let i = 0; i < dependencyNodeMap.size; i += 999) {
        const dependencySlice = sortedDependencyNodes.slice(i, i + 999);

        await insertNodesToDatabase(t, dependencySlice, projectId);

        log.info(`Inserted nodes (${i + dependencySlice.length}/${dependencyNodeMap.size})`, {
          length: dependencySlice.length,
        });
      }

      // TODO: If the performance of this sucks, we can move to using a generator instead.
      // Note: We have to insert the edges _after_ the nodes, otherwise the edges may refer to missing nodes
      const dependencyEdges = sortedDependencyNodes
        .flatMap((data) =>
          data.children.map((child) => ({
            parent_id: data.treeHashId,
            child_id: child.treeHashId,
          }))
        )
        // We sort these to help the database avoid deadlocking
        .sort(sortEdges);

      log.info(`Inserting edges`, {
        length: dependencyEdges.length,
      });

      // Insert the edges in batches to avoid exceeding the maximum query values limit
      for (let j = 0; j < dependencyEdges.length; j += 999) {
        const edgeSlice = dependencyEdges.slice(j, j + 999);

        await insertEdgesToDatabase(t, edgeSlice);

        log.info(`Inserted edges (${j + edgeSlice.length}/${dependencyEdges.length})`, { length: edgeSlice.length });
      }
    }
  );

  log.info(`Inserted nodes for package graphs into database`, { length: pkgGraphs.length });
}

export async function insertPackageManifestsIntoDatabase(
  buildId: string,
  pkgGraphs: CollectedPackageTree[]
): Promise<void> {
  if (pkgGraphs.length === 0) {
    log.info(`No package manifests found to insert for build`, { buildId });
    return;
  }

  log.info(`Inserting package manifests into database`, { length: pkgGraphs.length });

  await db.tx(async (trsx) => {
    await Promise.all(
      pkgGraphs.map(async (pkgGraph) => {
        const manifestId = await trsx.one<{ id: string }>(
          `INSERT INTO resolved_manifest (build_id, path, package_manager, lockfile_version, manifest_dependency_node_id)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT DO NOTHING
           RETURNING id`,
          [buildId, pkgGraph.lockFilePath, pkgGraph.packageManager, pkgGraph.lockfileVersion, pkgGraph.rootTreeHashID]
        );

        log.info(`Inserted manifest for build`, {
          manifestId: manifestId.id,
          buildId,
        });

        if (pkgGraph.dependencies.length === 0) {
          log.info(`No dependencies found for manifest`, { lockFilePath: pkgGraph.lockFilePath });
          return;
        }

        const dependencyColumns = new pgp.helpers.ColumnSet(['manifest_id', 'manifest_dependency_node_id'], {
          table: 'manifest_dependency',
        });

        const insertQuery = pgp.helpers.insert(
          pkgGraph.dependencies.map((pkg) => ({
            manifest_id: manifestId.id,
            manifest_dependency_node_id: pkg.node.treeHashId,
          })),
          dependencyColumns,
          'manifest_dependency'
        );

        await trsx.none(insertQuery + ' ON CONFLICT DO NOTHING');
      })
    );
  });
}

export async function snapshotPinnedDependencies(
  buildId: string,
  repoDir: string,
  codeUrl: string,
  projectId?: string
): Promise<void> {
  const pkgTree = await collectPackageGraphsFromDirectory(repoDir, buildId, codeUrl);

  // Creates all nodes and edges for the dependency graph into the database
  await insertPackageGraphsIntoDatabase(projectId || '', pkgTree);

  // Creates all manifests and associated root dependencies into the database
  await insertPackageManifestsIntoDatabase(buildId, pkgTree);
}
