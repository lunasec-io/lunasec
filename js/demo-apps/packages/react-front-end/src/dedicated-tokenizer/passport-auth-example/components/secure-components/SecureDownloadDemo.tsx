import { SecureDownload } from '@lunasec/react-sdk';
import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { UserDocumentsResponse } from '../../types';

export const SecureDownloadDemo: React.FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);

  const loadDocuments = async () => {
    const { data } = await axios.get<UserDocumentsResponse>(`/documents`);
    if (!data.success) {
      setError(JSON.stringify(data.error));
      return;
    }
    setDocuments(data.documents);
  };

  useEffect(() => {
    void loadDocuments(); // does this only once
  }, []);

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
      {error !== null ? (
        <Alert
          onClose={() => {
            setError(null);
          }}
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      ) : null}
      <Card>
        <CardHeader
          title={`Securely Download the last file Uploaded in SecureUpload ${documents[documents.length - 1]}`}
        />
        <CardContent>
          <Typography>
            <p>Download Link:</p>
            <SecureDownload token={documents[documents.length - 1]} errorHandler={(e) => setError(e.message)} />
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
