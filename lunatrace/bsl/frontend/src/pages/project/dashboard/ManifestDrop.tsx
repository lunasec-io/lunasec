import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { usePresignManifestUrlMutation } from '../../../store/api/generated';

export const ManifestDrop: React.FunctionComponent<{ project_id: string }> = ({ project_id }) => {
  console.log('rendering dropzone');
  const onDrop: DropzoneOptions['onDrop'] = (acceptedFiles) => {
    console.log(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [generatePresignedUrl, presignedUrlResult] = usePresignManifestUrlMutation();
  useEffect(() => {
    generatePresignedUrl({ project_id });
  }, []);
  console.log('result is ', presignedUrlResult);
  return (
    <Card variant="dark" className="clickable-card text-center" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drop a package.lock file here to manually submit a build</p>}
    </Card>
  );
};
