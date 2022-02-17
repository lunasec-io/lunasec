import React from 'react';
import { useParams } from 'react-router-dom';

import { ManifestDrop } from './ManifestDrop';

export const ProjectDashboardMain: React.FunctionComponent = () => {
  console.log('rendering main dashboard');
  const { project_id } = useParams();
  if (!project_id) return null;

  return <ManifestDrop project_id={project_id} />;
};
