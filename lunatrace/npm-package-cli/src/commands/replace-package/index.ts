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
import Arborist from '@npmcli/arborist';
// @ts-ignore
import { add, rm } from '@npmcli/arborist/lib/add-rm-pkg-deps';
import { Args, Command, Flags } from '@oclif/core';
import npa from 'npm-package-arg';
import { manifest } from 'pacote';

import { setupPackageTree } from '../../package/package-tree';
import { getScriptPath } from '../../package/utils/get-script-path';

export default class ReplacePackage extends Command {
  static description = 'Prints an NPM package tree';

  static examples = [
    `$ lunatrace-npm-cli show-tree /path/to/node/project
`,
  ];

  static flags = {
    old: Flags.string({ description: 'Target Package with Semver range to remove from Package.json', required: true }),
    new: Flags.string({
      description: 'New Package with Semver range to use as replacement in Package.json',
      required: true,
    }),
  };

  static args = {
    root: Args.string({ description: 'Root folder to read package.json from', required: false }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(ReplacePackage);

    const root = getScriptPath(args.root);

    this.log(`loading ${root} version ${flags.old}`);

    const tree = setupPackageTree({
      root: root,
    });

    const node = await tree.loadVirtualTreeFromRoot();

    const oldPackage = npa(flags.old);

    const nodes = await node.querySelectorAll(`[name=${oldPackage.escapedName}]:semver(${oldPackage.rawSpec})`);

    const resolvedManifest = await manifest(flags.new);

    this.log('resolved new:', resolvedManifest);

    nodes.map((n) => {
      if (!n.parent) {
        throw new Error('Unable to remove package for node without a parent');
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      n.package = resolvedManifest;
    });

    this.log('nodes:', nodes);

    node.meta?.commit();

    tree.arborist.reify({});

    const printTreeRecursive = (node: Arborist.Node, depth: number) => {
      const indent = ' '.repeat(depth * 2);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.log(`${indent}${node.name}@${node.version || 'nil'}`);
      node.children.forEach((child) => {
        printTreeRecursive(child, depth + 1);
      });
    };

    printTreeRecursive(node, 0);
  }
}
