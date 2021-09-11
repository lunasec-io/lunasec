import { SecureUpload } from '@lunasec/react-sdk';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { useStoreActions } from '../../store';

export const SecureUploadDemo: React.FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [saveSuccessful, setSaveSuccessful] = useState<boolean | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);
  const loadDocumentsThunk = useStoreActions((actions) => actions.loadDocuments);
  const uploadDocumentTokensThunk = useStoreActions((actions) => actions.uploadDocumentTokens);

  useEffect(() => {
    void loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const data = await loadDocumentsThunk();
    if (data.success) {
      setDocuments(data.documents);
      return;
    }
    setError(data.error);
  };

  const saveDocuments = async () => {
    const data = await uploadDocumentTokensThunk(documents);
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
        <CardHeader title="Documents" />
        <CardContent>
          <FormControl error={!!error}>
            <FormGroup>
              <FormLabel htmlFor="drivers-license-upload">Driver's License Upload</FormLabel>
              <SecureUpload
                id="drivers-license-upload"
                name="uploader"
                filetokens={documents}
                onTokenChange={(tokens) => {
                  setDocuments(tokens);
                }}
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

export const Upload: React.FunctionComponent = () => {
  // const [authError, setAuthError] = useState<string>('');
  return <SecureUploadDemo />;
};
