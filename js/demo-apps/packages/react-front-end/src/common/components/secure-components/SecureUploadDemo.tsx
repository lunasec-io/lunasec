/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { SecureUpload } from '@lunasec/react-sdk';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { useStoreActions } from '../../store';
import { Transport } from '../../types';

export const SecureUploadDemo: React.FunctionComponent<{
  transport: Transport;
}> = (props) => {
  const [error, setError] = useState<string | null>(null);
  const [saveSuccessful, setSaveSuccessful] = useState<boolean | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);
  const [loadDocuments, uploadDocumentTokens] = useStoreActions((actions) => [
    actions.loadDocuments,
    actions.uploadDocumentTokens,
  ]);

  useEffect(() => {
    // TODO: Move this into the Router
    const loadDocumentsAction = async () => {
      const data = await loadDocuments({ transport: props.transport });
      if (data.success) {
        setDocuments(data.documents);
        return;
      }
      setError(data.error);
    };

    void loadDocumentsAction();
  }, [loadDocuments, props.transport]);

  const saveDocuments = async () => {
    const data = await uploadDocumentTokens({ transport: props.transport, documents });
    if (!data.success) {
      setError(JSON.stringify(data.error));
      return;
    }
    setSaveSuccessful(true);
  };

  if (documents === null) {
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <p>Loading...</p>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title="Secure Upload Demo" />
        <CardContent>
          <p>
            This uploader dialog is a pre-made LunaSec component that uploads files into LunaSec and returns tokens. All
            file uploads happen from within the a separate iFrame, so this page is never able to see the actual data.
          </p>
          <p>
            To see how to set up your own Secure Uploader,{' '}
            <a
              href={
                'https://www.lunasec.io/docs/pages/getting-started/dedicated-tokenizer/handling-files/#uploading-a-file'
              }
            >
              see here
            </a>
            .
          </p>
          <Divider />
          <br />
          <FormControl error={!!error}>
            <FormGroup>
              <FormLabel htmlFor="drivers-license-upload">Select a File to Upload</FormLabel>
              <SecureUpload
                id="drivers-license-upload"
                name="uploader"
                fileTokens={documents}
                onTokenChange={(tokens) => {
                  setDocuments(tokens);
                }}
                customMetadata={{ customField: 'example' }}
                errorHandler={(e) => setError(e.message)}
              />
            </FormGroup>
            {error ? <FormHelperText>{error}</FormHelperText> : null}
            {saveSuccessful ? <FormHelperText>Saving documents was successful!</FormHelperText> : null}
            <Button
              id="save-documents"
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none' }}
              onClick={saveDocuments}
            >
              Save Documents
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
};
