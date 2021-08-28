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
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ApiResponse, UserDocumentsResponse } from '../types';

async function loadDocuments(
  setDocuments: React.Dispatch<React.SetStateAction<string[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  const { data } = await axios.get<UserDocumentsResponse>(`/documents`);
  if (data.success) {
    setDocuments(data.documents);
    return;
  }
  setError(data.error);
}

export const SecureDocumentsForm: React.FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [saveSuccessful, setSaveSuccessful] = useState<boolean | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);

  useEffect(() => {
    void loadDocuments(setDocuments, setError);
  }, []);

  const saveDocuments = async () => {
    const { data } = await axios.post<ApiResponse>(`/documents`, { documents });
    if (!data.success) {
      setError(JSON.stringify(data.error));
      return;
    }
    setSaveSuccessful(true);
  };

  if (error !== null) {
    return (
      <Grid item xs={12}>
        <Card>
          <CardHeader title={'Error'} />
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </Grid>
    );
  }

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
              />
            </FormGroup>
            {error ? <FormHelperText>{error}</FormHelperText> : null}
            {saveSuccessful ? <FormHelperText>Saving documents was successful!</FormHelperText> : null}
            <Button variant="outlined" color="primary" style={{ textTransform: 'none' }} onClick={saveDocuments}>
              Save Documents
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const Documents: React.FunctionComponent = () => {
  // const [authError, setAuthError] = useState<string>('');
  return <SecureDocumentsForm />;
};
