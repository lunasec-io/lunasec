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
import { SecureDownload } from '@lunasec/react-sdk';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';

import { useStoreActions } from '../../store';
import { Transport } from '../../types';

export const SecureDownloadDemo: React.FunctionComponent<{
  transport: Transport;
}> = (props) => {
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);

  const loadDocuments = useStoreActions((actions) => actions.loadDocuments);

  useEffect(() => {
    const loadDocumentsAction = async () => {
      const data = await loadDocuments({ transport: props.transport });
      if (!data.success) {
        setError(JSON.stringify(data.error));
        return;
      }
      setDocuments(data.documents);
    };

    void loadDocumentsAction(); // does this only once
  }, [loadDocuments, props.transport]);

  function renderErrors() {
    if (error !== null) {
      return (
        <Alert
          onClose={() => {
            setError(null);
          }}
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      );
    }
    return null;
  }

  if (documents.length < 1) {
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <p>No documents to download, please upload a document first in SecureUpload</p>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      {renderErrors()}
      <Card>
        <CardHeader title={`Secure Download Demo`} />
        <CardContent>
          <p>
            This download link downloads the last file uploaded to Secure Upload in the previous demo. If you right
            click and inspect the element with your Developer Tools, you will see that it is actually inside of an
            iFrame. Even the file name is protected by LunaSec.
          </p>
          <p>
            To see how to set up your own Secure Download,{' '}
            <a
              href={
                'https://www.lunasec.io/docs/pages/getting-started/dedicated-tokenizer/handling-files/#downloading-a-file'
              }
            >
              see here
            </a>
            .
          </p>
          <Divider />
          <br />
          <Typography>Download Link:</Typography>
          <SecureDownload token={documents[documents.length - 1]} errorHandler={(e) => setError(e.message)} />
        </CardContent>
      </Card>
    </Grid>
  );
};
