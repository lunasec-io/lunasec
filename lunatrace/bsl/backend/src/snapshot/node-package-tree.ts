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
import { buildDepTreeFromFiles } from 'snyk-nodejs-lockfile-parser-lunatrace-fork';
import { v4 as uuid } from 'uuid';

import { db, pgp } from '../database/db';
import {
  DependencyGraphNode,
  dfsGenerateMerkleTreeFromDepTree,
} from '../database/dependency-relationship-dag-calculator';
import { findFilesMatchingFilter } from '../utils/filesystem-utils';
import { log } from '../utils/log';

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

interface ManifestDependencyEdge {
  parentId: string;
  childId: string;
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

async function getPackageId<Ext>(t: ITask<Ext>, name: string, packageManager: string, customRegistry: string) {
  const selectPackageIdQuery = `SELECT id FROM package.package WHERE name = $1 AND package_manager = $2 AND custom_registry = $3`;

  const packageId = await t.oneOrNone<{ id: string }>(selectPackageIdQuery, [name, packageManager, customRegistry]);

  if (packageId && packageId.id) {
    return packageId.id;
  }

  const newPackageId = await t.oneOrNone<{ id: string }>(
    `INSERT INTO package.package (name, package_manager, custom_registry)
           VALUES ($1, $2, $3)
           ON CONFLICT DO NOTHING
           RETURNING id`,
    [name, packageManager, customRegistry]
  );

  if (newPackageId && newPackageId.id) {
    return newPackageId.id;
  }

  return (await t.one<{ id: string }>(selectPackageIdQuery, [name, packageManager, customRegistry])).id;
}

async function getPackageReleaseId<Ext>(t: ITask<Ext>, packageId: string, version: string) {
  const selectPackageReleaseIdQuery = `SELECT id FROM package.release WHERE package_id = $1 AND version = $2`;

  const packageReleaseId = await t.oneOrNone<{ id: string }>(selectPackageReleaseIdQuery, [packageId, version]);

  if (packageReleaseId && packageReleaseId.id) {
    return packageReleaseId.id;
  }

  const newPackageReleaseId = await t.oneOrNone<{ id: string }>(
    `INSERT INTO package.release (package_id, version)
             VALUES ($1, $2)
             ON CONFLICT DO NOTHING
             RETURNING id`,
    [packageId, version]
  );

  if (newPackageReleaseId && newPackageReleaseId.id) {
    return newPackageReleaseId.id;
  }

  return (await t.one<{ id: string }>(selectPackageReleaseIdQuery, [packageId, version])).id;
}

async function insertNodesToDatabase<Ext>(t: ITask<Ext>, queryData: DependencyGraphNode[]) {
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

      const packageId = await getPackageId(
        t,
        packageData.name || '',
        packageData.packageManager,
        packageData.customRegistry
      );

      const packageReleaseId = await getPackageReleaseId(t, packageId, packageData.version || '');

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

async function insertEdgesToDatabase<Ext>(t: ITask<Ext>, queryData: ManifestDependencyEdge[]) {
  const manifestDependencyEdgeColumns = new pgp.helpers.ColumnSet(['parent_id', 'child_id'], {
    table: 'manifest_dependency_edge',
  });

  const edgeInsertData = queryData.map((edge) => ({
    parent_id: edge.parentId,
    child_id: edge.childId,
  }));

  const edgeInsertQuery = pgp.helpers.insert(edgeInsertData, manifestDependencyEdgeColumns) + ' ON CONFLICT DO NOTHING';

  await t.none(edgeInsertQuery);
}

async function insertPackageGraphsIntoDatabase(buildId: string, pkgGraphs: CollectedPackageTree[]) {
  log.info(`Inserting ${pkgGraphs.length} package graphs into database`);

  if (pkgGraphs.length === 0) {
    return;
  }

  const uniqueRootDependencyHashes = pkgGraphs.flatMap((pkgGraph) =>
    pkgGraph.dependencies.map((pkg) => pkg.rootNode.treeHashId)
  );

  // Remove duplicates
  const uniqueNodeRootIds = new Set(uniqueRootDependencyHashes);

  log.info(`Found ${uniqueNodeRootIds.size} unique root dependency hashes`);

  const currentlyKnownRootIds =
    uniqueNodeRootIds.size > 0
      ? await db.manyOrNone(
          `SELECT id FROM manifest_dependency_node WHERE id IN (${pgp.as
            .array(Array.from(uniqueNodeRootIds))
            .replace(/^array\[/i, '')
            .replace(/]$/, '')})`
        )
      : [];

  log.info(`Found ${uniqueNodeRootIds.size} missing root dependency hashes`);

  // Allows us to hold only one copy of each node for querying later
  const dependencyNodeMap = new Map<string, DependencyGraphNode>();

  pkgGraphs.forEach((pkgGraph) => {
    pkgGraph.dependencies.forEach((pkg) => {
      if (currentlyKnownRootIds.includes(pkg.rootNode.treeHashId)) {
        return;
      }

      const dependencyMap = packageGraphToUniqueDependencyNodes(pkg.rootNode);

      // Merge down the map to only include the unique nodes
      for (const [key, value] of dependencyMap) {
        dependencyNodeMap.set(key, value);
      }
    });
  });

  log.info(`Total ${dependencyNodeMap.size} unique transitive dependency hashes`);

  const currentKnownQuery = `SELECT id FROM manifest_dependency_node WHERE id IN (${pgp.as
    .array(Array.from(dependencyNodeMap.keys()))
    .replace(/^array\[/i, '')
    .replace(/]$/, '')})`;

  const currentlyKnownTransitiveDependencyIds =
    dependencyNodeMap.size > 0 ? await db.manyOrNone<string>(currentKnownQuery) : [];

  log.info(`Found ${currentlyKnownTransitiveDependencyIds.length} known transitive dependency hashes`);

  // Remove the nodes that we know we don't need to insert.
  // Warning: Dragons!
  // We're mutating state which is where bugs stem from.
  // This will reduce memory usage though, so we'll allow it.
  currentlyKnownTransitiveDependencyIds.forEach((id) => {
    dependencyNodeMap.delete(id);
  });

  log.info(`Found ${dependencyNodeMap.size} transitive dependency hashes to insert`);

  // Insert any new dependencies into the database
  await db.tx(
    {
      // Sets the performance of this transaction to not involve any types of locking for performance
      mode: new pgp.txMode.TransactionMode({
        tiLevel: pgp.txMode.isolationLevel.none,
      }),
    },
    async (t) => {
      // Insert the nodes in batches to avoid exceeding the maximum query values limit
      for (let i = 0; i < dependencyNodeMap.size; i += 999) {
        const dependencySlice = Array.from(dependencyNodeMap.values()).slice(i, i + 999);

        await insertNodesToDatabase(t, dependencySlice);

        log.info(`Inserted ${dependencySlice.length} nodes (${i + dependencySlice.length}/${dependencyNodeMap.size})`);
      }

      // TODO: If the performance of this sucks, we can move to using a generator instead.
      // Note: We have to insert the edges _after_ the nodes, otherwise the edges may refer to missing nodes
      const dependencyEdges = Array.from(dependencyNodeMap.values()).flatMap((data) =>
        data.children.map((child) => ({
          parentId: data.treeHashId,
          childId: child.treeHashId,
        }))
      );

      log.info(`Inserting ${dependencyEdges.length} edges`);

      // Insert the edges in batches to avoid exceeding the maximum query values limit
      for (let j = 0; j < dependencyEdges.length; j += 999) {
        const edgeSlice = dependencyEdges.slice(j, j + 999);

        await insertEdgesToDatabase(t, edgeSlice);

        log.info(`Inserted ${edgeSlice.length} edges (${j + edgeSlice.length}/${dependencyEdges.length})`);
      }
    }
  );

  log.info(`Inserted nodes for ${pkgGraphs.length} package graphs into database`);

  await db.tx(async (t) => {
    await Promise.all(
      pkgGraphs.map(async (pkgGraph) => {
        const manifestId = await t.one<{ id: string }>(
          `INSERT INTO resolved_manifest (build_id, path)
             VALUES ($1, $2)
             ON CONFLICT DO NOTHING
             RETURNING id`,
          [buildId, pkgGraph.lockFilePath]
        );

        log.info(`Inserted manifest ${manifestId.id} for ${buildId}`);

        const dependencyColumns = new pgp.helpers.ColumnSet(['manifest_id', 'manifest_dependency_node_id'], {
          table: 'manifest_dependency',
        });

        const insertQuery = pgp.helpers.insert(
          pkgGraph.dependencies.map((pkg) => ({
            manifest_id: manifestId.id,
            manifest_dependency_node_id: pkg.rootNode.treeHashId,
          })),
          dependencyColumns,
          'manifest_dependency'
        );

        await t.none(insertQuery + ' ON CONFLICT DO NOTHING');
      })
    );
  });
}

export async function snapshotPinnedDependencies(buildId: string, repoDir: string): Promise<void> {
  const pkgGraphs = await collectPackageGraphsFromDirectory(repoDir);

  await insertPackageGraphsIntoDatabase(buildId, pkgGraphs);
}
