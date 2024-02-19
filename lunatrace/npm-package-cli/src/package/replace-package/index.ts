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
// noinspection CssInvalidPseudoSelector JSConstantReassignment

import { Node } from '@npmcli/arborist';
import npa, { Result } from 'npm-package-arg';
import { AbbreviatedManifest, manifest, ManifestResult } from 'pacote';

export async function replacePackagesForNode(
  node: Node,
  oldPackage: string,
  newPackage: string
): Promise<{ updatedNodes: Node[]; newPackageManifest: AbbreviatedManifest & ManifestResult }> {
  const { escapedName, rawSpec } = npa(oldPackage);

  // TODO: Figure out if this works for `git` packages as well. (It probably doesn't and will require a separate code path)
  const nodes = await node.querySelectorAll(`[name=${escapedName}]:semver(${rawSpec})`);

  const newPackageManifest = await manifest(newPackage);

  nodes.map((n) => {
    if (!n.parent) {
      throw new Error('Unable to remove package for node without a parent');
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    n.package = {
      ...newPackageManifest,
      resolved: newPackageManifest._resolved,
      integrity: newPackageManifest._integrity,
    };

    // These fields are required by Arborist to properly update the lockfile.
    n.resolved = newPackageManifest._resolved;
    n.integrity = newPackageManifest._integrity;
  });

  return {
    updatedNodes: nodes,
    newPackageManifest,
  };
}
