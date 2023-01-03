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
import { ExternalLink } from 'react-feather';

import { formatPackageManagerUrlForPackage } from '../utils/advisory';

interface PackageManagerLinkProps {
  packageName: string;
  packageManager: string;
}

export const PackageManagerLink: React.FC<PackageManagerLinkProps> = ({ packageName, packageManager }) => {
  const packageManagerLink = formatPackageManagerUrlForPackage(packageManager, packageName);
  if (packageManagerLink === null) {
    return null;
  }
  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        href={packageManagerLink}
        className="m-1"
      >
        {packageManager}
        <ExternalLink size="1em" className="mb-1 mx-1" />
      </a>
    </>
  );
};
