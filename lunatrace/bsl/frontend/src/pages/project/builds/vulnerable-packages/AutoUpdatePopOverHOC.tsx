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
import { VulnerablePackage } from '@lunatrace/lunatrace-common';
import React from 'react';
import { Popover } from 'react-bootstrap';
import { CopyBlock, tomorrowNight } from 'react-code-blocks';

import { DepTree } from '../types';

import { Finding } from './types';

export const AutoUpdatePopOverHOC = (pkgsToUpdate: VulnerablePackage<Finding>[], depTree: DepTree) => {
  const pkgNameList = pkgsToUpdate.map((p) => p.package_name).join(' ');
  return (
    <Popover className="all-packages-update-popover">
      <Popover.Header>Updatable Vulnerable Packages</Popover.Header>
      <Popover.Body>
        Some vulnerable packages in this project have fixes available that are within their requested semver range. Your
        lockfile is probably holding these versions down.
        <hr className="m-1" />
        This command will update the packages:
        <CopyBlock
          text={`npm update ${pkgNameList}`}
          language="bash"
          showLineNumbers={false}
          startingLineNumber={false}
          theme={tomorrowNight}
          codeBlock
        />
        or for Yarn:
        <CopyBlock
          text={`yarn upgrade ${pkgNameList} `}
          language="bash"
          showLineNumbers={false}
          startingLineNumber={false}
          theme={tomorrowNight}
          codeBlock
        />
      </Popover.Body>
    </Popover>
  );
};
