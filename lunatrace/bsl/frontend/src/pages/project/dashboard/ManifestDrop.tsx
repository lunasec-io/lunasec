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
import axios, { AxiosRequestHeaders } from 'axios';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { useInsertManifestMutation, usePresignManifestUrlMutation } from '../../../store/api/generated';

const axiosInstance = axios.create();

export const ManifestDrop: React.FunctionComponent<{ project_id: string }> = ({ project_id }) => {
  console.log('rendering dropzone for project id ', project_id);

  const [generatePresignedUrl] = usePresignManifestUrlMutation();
  const [insertManifest] = useInsertManifestMutation();

  const onDrop: DropzoneOptions['onDrop'] = async (acceptedFiles) => {
    console.log('File dropped! ', acceptedFiles);
    const file = acceptedFiles[0];

    if (!file) return;

    const presignRequest = await generatePresignedUrl({ project_id }).unwrap(); //unwrap turns this into an inline call
    const presignResult = presignRequest.presignManifestUpload;
    if (!presignResult) {
      console.error('failed presigning url');
      return;
    }
    console.log('presign result ', presignResult);
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    const uploadResult = await axios.put(presignResult.url, file, options);
    console.log('upload success ', uploadResult.data);
    const manifestUrl = presignResult.url.split('?')[0];
    console.log('new file is at ', manifestUrl);

    const insertRequest = await insertManifest({ s3_url: manifestUrl, project_id, filename: file.name }).unwrap();
    if (!insertRequest.insert_manifests_one) {
      console.error('Failed to notify lunatrace up uploaded manifest');
      return;
    }
    const manifestId = insertRequest.insert_manifests_one.id;
    console.log('manifest id is ', manifestId);
    // return axios.put(signedUrl, file, options);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card variant="dark" className="clickable-card text-center" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drop a package.lock file here to manually submit a build</p>}
    </Card>
  );
};
