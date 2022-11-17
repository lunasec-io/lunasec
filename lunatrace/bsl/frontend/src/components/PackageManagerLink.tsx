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
        <ExternalLink size="1em" className="mb-1 me-1" />
        {packageManager}
      </a>
    </>
  );
};
