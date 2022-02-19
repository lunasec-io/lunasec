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
import React, { useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { FilePlus } from 'react-feather';

import useAppDispatch from '../../../hooks/useAppDispatch';
import { useInsertManifestMutation, usePresignManifestUrlMutation } from '../../../store/api/generated';
import { add } from '../../../store/slices/alerts';

const axiosInstance = axios.create();

export const ManifestDrop: React.FunctionComponent<{ project_id: string }> = ({ project_id }) => {
  const dispatch = useAppDispatch();
  console.log('rendering dropzone for project id ', project_id);

  const [generatePresignedUrl] = usePresignManifestUrlMutation();
  const [insertManifest] = useInsertManifestMutation();

  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const doUploadFlow = async (file: File): Promise<string | undefined> => {
    // Get a presigned URL (hasura action reaches through and hits express backend
    const presignResponse = await generatePresignedUrl({ project_id }).unwrap(); //unwrap turns this into an inline call
    const presign = presignResponse.presignManifestUpload;
    if (!presign) {
      return 'Failed to pre-sign upload URL to AWS S3';
    }
    console.log('presign result ', presign);

    // Upload the file directly to S3
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    setUploadStatus(`Uploading ${file.name}`);
    const uploadResult = await axiosInstance.put(presign.url, file, options);
    console.log('upload success ', uploadResult.data);
    const manifestUrl = presign.url.split('?')[0];
    console.log('new file is at ', manifestUrl);
    setUploadStatus(`File uploaded, notifying LunaTrace`);

    // Tell lunatrace the file uploaded, which simultaneously records the file path in hasura and calls express to kick
    // off the build via an action
    const insertRequest = await insertManifest({
      s3_url: manifestUrl,
      project_id,
      filename: file.name,
      key: presign.key,
      bucket: presign.bucket,
    }).unwrap();
    if (!insertRequest.insert_manifests_one) {
      console.error('Failed to notify lunatrace up uploaded manifest');
      return;
    }
    const manifestId = insertRequest.insert_manifests_one.id;
    console.log('manifest id is ', manifestId);
    setUploadStatus(`Scan in progress, you will be automatically redirected when complete...`);

    // return axios.put(signedUrl, file, options);
  };

  const onDropAccepted: DropzoneOptions['onDropAccepted'] = async (acceptedFiles) => {
    setUploadInProgress(true);

    const file = acceptedFiles[0];
    if (!file) return;
    const error = await doUploadFlow(file);
    if (error) {
      dispatch(add({ message: error }));
    }
    setUploadInProgress(false);
    setUploadStatus('');
  };

  const onDropRejected: DropzoneOptions['onDropRejected'] = (fileRejections) => {
    console.error('rejected file with errors ', fileRejections);
    const rejection = fileRejections[0];
    if (!rejection) return;
    dispatch(add({ message: rejection.errors[0].message }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDropAccepted,
    onDropRejected: onDropRejected,
    maxFiles: 1,
    maxSize: 52428800,
  });

  const renderDropPrompt = () => {
    if (isDragActive) {
      return <p>Drop the file here ...</p>;
    }
    return (
      <span>
        <FilePlus />
        Click here or drop a manifest file to manually submit a build. (ex: package.lock)
      </span>
    );
  };

  const renderUploadStatus = () => {
    return (
      <>
        <Col xs="auto">
          <Spinner animation="border" />
        </Col>
        <Col xs="auto">
          <span>{uploadStatus}</span>
        </Col>
      </>
    );
  };
  return (
    <Card variant="dark" className="clickable-card" {...getRootProps()}>
      <Card.Body>
        <input {...getInputProps()} />

        <Row className="justify-content-center">
          {uploadInProgress ? renderUploadStatus() : <Col xs="auto">{renderDropPrompt()}</Col>}
        </Row>
      </Card.Body>
    </Card>
  );
};
