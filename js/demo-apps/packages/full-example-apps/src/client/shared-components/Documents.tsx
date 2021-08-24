import { LunaSecConfigContext, SecureUpload } from '@lunasec/react-sdk';
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

import { lunaSecDomain } from '../constants';
import {
  loadUserDocumentsAPI,
  performSaveDocumentsAPI,
} from '../dedicated-tokenizer/passport-auth-example/utils/api-facade';

async function loadDocuments(setDocuments, setError) {
  const documentsResp = await loadUserDocumentsAPI();
  if (documentsResp.success) {
    setDocuments(documentsResp.documents);
    return;
  }
  setError(documentsResp.error);
}

export const SecureDocumentsForm: React.FunctionComponent = () => {
  const [error, setError] = useState<string>(null);
  const [saveSuccessful, setSaveSuccessful] = useState<boolean>(null);
  const [documents, setDocuments] = useState<string[]>(null);

  useEffect(() => {
    void loadDocuments(setDocuments, setError);
  }, []);

  const handleUploadChange = (tokens) => {
    setDocuments(tokens);
  };

  const saveDocuments = async () => {
    const res = await performSaveDocumentsAPI(documents);
    if (!res.success) {
      setError(JSON.stringify(res.error));
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
        <CardHeader title='Documents' />
        <CardContent>
          <FormControl error={!!error}>
            <FormGroup>
              <FormLabel htmlFor='drivers-license-upload'>Driver's License Upload</FormLabel>
              <SecureUpload
                id='drivers-license-upload'
                name='uploader'
                filetokens={documents}
                onTokenChange={handleUploadChange}
              />
            </FormGroup>
            {error ? <FormHelperText>{error}</FormHelperText> : null}
            {saveSuccessful ? <FormHelperText>Saving documents was successful!</FormHelperText> : null}
            <Button variant='outlined' color='primary' style={{ textTransform: 'none' }} onClick={saveDocuments}>
              Save Documents
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const Documents: React.FunctionComponent = () => {
  const [authError, setAuthError] = useState<string>('');
  return (
    <LunaSecConfigContext.Provider
      value={{
        lunaSecDomain: lunaSecDomain,
        authenticationErrorHandler: (_e: Error) => {
          setAuthError('Failed to authenticate with LunaSec. \n Is a user logged in?');
        },
      }}
    >
      {authError !== null ? <p>{authError}</p> : null}
      <SecureDocumentsForm />
    </LunaSecConfigContext.Provider>
  );
};
