import React, { useState } from 'react';

import { BuildDetails } from './BuildDetails';
import { BuildList } from './BuildList';
import { BuildInfo } from './types';

interface BuildsProps {
  builds: BuildInfo[];
}

export const Builds: React.FunctionComponent<BuildsProps> = ({ builds }) => {
  const [buildDetailId, setBuildDetailId] = useState<string | null>(null);
  if (!buildDetailId) {
    return <BuildList builds={builds} setBuildDetailId={setBuildDetailId} />;
  }
  return <BuildDetails buildId={buildDetailId} />;
};
