/*
 * Copyright 2023 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { join } from 'path';

import Arborist, { Node } from '@npmcli/arborist';

import { PackageTreeConfig } from '../types';

function getPackageJsonPath(config: PackageTreeConfig): string {
  return config.packageJsonPath || join(config.root, 'package.json');
}

/**
 * Returns the path to the package-lock.json file (if NPM) or the yarn.lock (if Yarn).
 * Arborist can handle reading either configuration format.
 * @param config The package tree configuration.
 */
function getPackageLockPath(config: PackageTreeConfig): string {
  if (config.packageManager === 'yarn') {
    return config.packageLockPath || join(config.root, 'yarn.lock');
  }

  return config.packageLockPath || join(config.root, 'package-lock.json');
}

export function setupPackageTree(config: PackageTreeConfig): PackageTree {
  if (!config.root || config.root === '') {
    throw new Error('Root path is required');
  }

  // Ensure that the config path always has a slash at the end.
  if (!config.root.endsWith('/')) {
    config.root = config.root + '/';
  }

  const fullPackageJsonPath = getPackageJsonPath(config);
  const fullPackageLockPath = getPackageLockPath(config);

  return new PackageTree({
    ...config,
    fullPackageJsonPath,
    fullPackageLockPath,
  });
}

export class PackageTree {
  fullPackageJsonPath!: string;
  fullPackageLockPath!: string;
  root!: string;

  /**
   * The instance of Arborist, the NPM package manager utility library, that has been loaded against the specific config.
   */
  arborist!: Arborist;

  constructor(config: PackageTreeConfig & { fullPackageJsonPath: string; fullPackageLockPath: string }) {
    this.fullPackageJsonPath = config.fullPackageJsonPath;
    this.fullPackageLockPath = config.fullPackageLockPath;
    this.root = config.root;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.arborist = new Arborist({
      path: this.root,
      packageLockOnly: true,
    });
  }

  /**
   * Loads the entire package tree from the root node.
   */
  loadVirtualTreeFromRoot(): Promise<Arborist.Node> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const root = new Node({
      path: this.root,
      pkg: this.fullPackageJsonPath,
    });

    return this.arborist.loadVirtual({ root: root });
  }
}
