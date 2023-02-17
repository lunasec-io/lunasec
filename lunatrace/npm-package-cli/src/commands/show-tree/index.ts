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

import Arborist from '@npmcli/arborist';
import { Args, Command } from '@oclif/core';

import { setupPackageTree } from '../../package/package-tree';
import { getScriptPath } from '../../package/utils/get-script-path';

export default class ShowTree extends Command {
  static description = 'Prints an NPM package tree';

  static examples = [
    `$ lunatrace-npm-cli show-tree /path/to/node/project
`,
  ];

  static args = {
    root: Args.string({ description: 'Root folder to read package.json from', required: false }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(ShowTree);

    const root = getScriptPath(args.root);

    this.log(`loading ${root}`);

    const tree = setupPackageTree({
      root: root,
    });

    const virtualTree = await tree.loadVirtualTreeFromRoot();

    this.log('Package tree:\n');

    const printTreeRecursive = (node: Arborist.Node, depth: number) => {
      const indent = ' '.repeat(depth * 2);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.log(`${indent}${node.name}@${node.version || 'nil'}`);
      node.children.forEach((child) => {
        printTreeRecursive(child, depth + 1);
      });
    };

    printTreeRecursive(virtualTree, 0);
  }
}
