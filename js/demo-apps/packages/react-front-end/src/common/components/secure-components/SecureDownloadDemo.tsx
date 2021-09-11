import { SecureDownload } from '@lunasec/react-sdk';
import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';

import { useStoreActions } from '../../store';

export const SecureDownloadDemo: React.FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);

  const loadDocumentsThunk = useStoreActions((actions) => actions.loadDocuments);

  const loadDocuments = async () => {
    const data = await loadDocumentsThunk();
    if (!data.success) {
      setError(JSON.stringify(data.error));
      return;
    }
    setDocuments(data.documents);
  };

  useEffect(() => {
    void loadDocuments(); // does this only once
  }, []);

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
        <CardHeader
          title={`Securely Download the last file Uploaded in SecureUpload ${documents[documents.length - 1]}`}
        />
        <CardContent>
          <Typography>Download Link:</Typography>
          <SecureDownload token={documents[documents.length - 1]} errorHandler={(e) => setError(e.message)} />
        </CardContent>
      </Card>
    </Grid>
  );
};
