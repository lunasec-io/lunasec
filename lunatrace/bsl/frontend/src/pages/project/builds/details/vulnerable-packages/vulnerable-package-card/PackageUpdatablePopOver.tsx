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
import React from 'react';
import { NavLink, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { CopyBlock, tomorrowNight } from 'react-code-blocks';
import { FcUpload } from 'react-icons/fc';

import useBreakpoint from '../../../../../../hooks/useBreakpoint';
import { isDirectDep } from '../../../../../../utils/package';
import { VulnerablePackage } from '../types';
export const PackageUpdatablePopOver: React.FC<{ pkg: VulnerablePackage }> = ({ pkg }) => {
  const trivialUpdateStatus = pkg.trivially_updatable;

  if (!trivialUpdateStatus || trivialUpdateStatus === 'no') {
    return null;
  }

  const renderToolTip = (props: React.ComponentProps<typeof Tooltip>) => {
    return (
      <Popover className="vulnerablePackage-update-popover" {...props}>
        <Popover.Header>Trivially Updatable </Popover.Header>
        <Popover.Body>
          A fix is available within the semver range this package was requested with, meaning that the{' '}
          <strong>project lockfile</strong> is probably the only thing constraining the package to the vulnerable
          version.
          <hr className="m-1" />
          {isDirectDep(pkg) ? (
            <>
              This command will update the package:
              <CopyBlock
                text={`npm update ${pkg.release.package.name}`}
                language="bash"
                showLineNumbers={false}
                startingLineNumber={false}
                theme={tomorrowNight}
                codeBlock
              />
              or for Yarn:
              <CopyBlock
                text={`yarn upgrade ${pkg.release.package.name}`}
                language="bash"
                showLineNumbers={false}
                startingLineNumber={false}
                theme={tomorrowNight}
                codeBlock
              />
            </>
          ) : (
            <>
              This package is a <strong>transitive</strong> (deep) dependency. Due to constraints of NPM and Yarn,
              updating it is only possible by manually deleting it from your project&apos;s lockfile (or deleting your
              entire lockfile) and then re-running your package install command (npm install) to fetch the latest
              version. Automated lockfile patching is currently in development by LunaTrace.
            </>
          )}
        </Popover.Body>
      </Popover>
    );
  };

  const mdOrLarger = useBreakpoint('md');
  return (
    <>
      {' '}
      <OverlayTrigger trigger="click" rootClose placement={mdOrLarger ? 'right' : 'bottom'} overlay={renderToolTip}>
        <NavLink className="primary-color d-inline m-0 p-0">
          {trivialUpdateStatus === 'partially' ? 'partially ' : ''}updatable
          <FcUpload color="black" className="pb-1" />
        </NavLink>
      </OverlayTrigger>
    </>
  );
};
