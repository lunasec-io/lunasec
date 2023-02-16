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
import { Args, Command, Flags } from '@oclif/core';

import { replacePackagesForNode } from '../../package/replace-package';
import { setupPackageTree } from '../../package/replace-package/package-tree';
import { getScriptPath } from '../../package/utils/get-script-path';

export const ReplacePackageFlags = {
  old: Flags.string({ description: 'Target Package with Semver range to remove from Package.json', required: true }),
  new: Flags.string({
    description: 'New Package with Semver range to use as replacement in Package.json',
    required: true,
  }),
};

export default class ReplacePackage extends Command {
  static description = 'Replaces an NPM package in the package tree';

  static examples = [
    `$ lunatrace-npm-cli replace-package /path/to/node/project --old react@^16.0.0 --new react@^16.2.0`,
  ];

  static flags = ReplacePackageFlags;

  static args = {
    root: Args.string({ description: 'Root folder to read package.json from', required: false }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(ReplacePackage);

    const root = getScriptPath(args.root);

    this.log(`changing lockfile at ${root} from ${flags.old} to ${flags.new}`);

    const tree = setupPackageTree({
      root: root,
    });

    // TODO: Figure out why Arborist marks everything as "extraneous" in the generated lockfile.
    const node = await tree.loadVirtualTreeFromRoot();

    const { updatedNodes } = await replacePackagesForNode(node, flags.old, flags.new);

    this.log(`Updated ${updatedNodes.length} packages`);

    // This updates the package-lock.json file on disk.
    // Note: We may actually need to call `tree.reify()` in order to get the transitive dependencies to update.
    // It's unclear and untested currently.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await node.meta.save();

    this.log(`Updated package-lock.json with changes`);

    // For more context on what "updating sub-dependencies" means, see:
    // A@^1.0.0 -> B@^1.0.0 -> C@^1.0.0
    // If we update B from ^1.0.0 to ^1.1.0, and B adds a new dependency on D@^1.0.0, we need to include D.
    // This is what `reify()` does for us, but it also writes all of the `node_modules` to the disk.
    // It's unclear if it's possible to do this with the `virtual` tree and if the code path for that exists in Arborist.
  }
}
