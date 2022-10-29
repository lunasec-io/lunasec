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
import { skipToken } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { FilePlus } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import api from '../../../api';
import { GetManifestQuery } from '../../../api/generated';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { add } from '../../../store/slices/alerts';
const axiosInstance = axios.create();

export const ManifestDrop: React.FunctionComponent<{ project_id: string; forHomepage?: boolean }> = ({
  forHomepage,
  project_id,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [generatePresignedUrl] = api.usePresignManifestUrlMutation();
  const [insertManifest] = api.useInsertManifestMutation();
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [getManifestTrigger, lastManifestArg] = api.endpoints.GetManifest.useLazyQuerySubscription({
    pollingInterval: 1000,
  });
  // ok so this hook pulls the last fetched result out of redux for the given arguments
  // The above subscription short poll will eventually return data and this is how we get it back out...just not a great API and the types are broken
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const manifestQuery = api.endpoints.GetManifest.useQueryState(lastManifestArg || skipToken) as {
    status: string;
    currentData: GetManifestQuery;
  } | null;

  const doUploadFlow = async (file: File): Promise<string | undefined> => {
    // Get a presigned URL (hasura action reaches through and hits express backend
    const presignResponse = await generatePresignedUrl({ project_id }).unwrap(); //unwrap turns this into an inline call
    const presign = presignResponse.presignManifestUpload;
    if (!presign) {
      return 'Failed to pre-sign upload URL to AWS S3';
    }
    // get the URL without the query string
    const manifestUrl = presign.url.split('?')[0];
    // todo: doing this second could introduce a race condition, fix later. take manifest ID and send it to the backend where it can verify ownership...
    const insertRequest = await insertManifest({
      s3_url: manifestUrl,
      project_id,
      filename: file.name,
      key: presign.key,
    }).unwrap();
    if (!insertRequest.insert_manifests_one) {
      console.error('Failed to notify lunatrace of uploaded manifest');
      return;
    }
    const manifestId = insertRequest.insert_manifests_one.id;

    // Upload the file directly to S3
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    setUploadStatus(`Uploading ${file.name}`);
    const uploadResult = await axiosInstance.put(presign.url, file, options);

    setUploadStatus(`File uploaded, waiting for snapshot to begin`);
    // Tell lunatrace the file uploaded, which simultaneously records the file path in hasura and calls express to kick
    // off the build via an action

    void getManifestTrigger({ id: manifestId });
  };

  useEffect(() => {
    if (manifestQuery && manifestQuery.status === 'fulfilled' && manifestQuery.currentData.manifests_by_pk) {
      switch (manifestQuery.currentData.manifests_by_pk.status) {
        case 'sbom-processing':
          setUploadStatus('Package snapshot in progress');
          break;
        case 'sbom-generated':
          setUploadStatus('Package snapshot complete, waiting for vulnerabilities scan to begin');
          break;
        case 'scanning':
          setUploadStatus('Vulnerability scan started, you will be redirected when complete...');
          break;
        case 'scanned':
          navigate(`./build/${manifestQuery.currentData.manifests_by_pk.build_id}`);
          break;
        case 'error':
          dispatch(add({ message: `Error processing manifest: ${manifestQuery.currentData.manifests_by_pk.message}` }));
          setUploadInProgress(false);
      }
    }
  }, [manifestQuery]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onDropAccepted: DropzoneOptions['onDropAccepted'] = async (acceptedFiles) => {
    setUploadInProgress(true);

    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    const error = await doUploadFlow(file);
    if (error) {
      dispatch(add({ message: error }));
      setUploadInProgress(false);
    }
  };

  const onDropRejected: DropzoneOptions['onDropRejected'] = (fileRejections) => {
    console.error('rejected file with errors ', fileRejections);
    const rejection = fileRejections[0];
    if (!rejection) {
      return;
    }
    dispatch(add({ message: rejection.errors[0].message }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDropAccepted,
    onDropRejected: onDropRejected,
    maxFiles: 1,
    maxSize: 16106127360,
    disabled: uploadInProgress,
  });

  const renderDropPrompt = () => {
    if (isDragActive) {
      return <p>Drop the file here ...</p>;
    }
    return (
      <span>
        <FilePlus className="me-1 mb-1" />
        Click here or drap-and-drop a manifest file to manually submit a build.
        <br />
        (ex: package-lock.json)
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
    <Card
      className={forHomepage ? 'clickable-card ms-md-6 me-md-6 homepage-manifest-drop' : 'clickable-card w-100'}
      {...getRootProps()}
    >
      <Card.Body>
        <input {...getInputProps()} />

        <Row className="justify-content-center text-center ">
          {uploadInProgress ? renderUploadStatus() : <Col xs="auto">{renderDropPrompt()}</Col>}
        </Row>
      </Card.Body>
    </Card>
  );
};
