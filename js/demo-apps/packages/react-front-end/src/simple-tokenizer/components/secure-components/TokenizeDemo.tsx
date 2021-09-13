import { SecureForm, SecureInput } from '@lunasec/react-sdk';
import { Button, Card, CardContent, CardHeader, FormGroup, FormLabel, Grid, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import React, { useState } from 'react';

import { ApiResponse } from '../../../common/types';
import { tokenizer } from '../configureTokenizer';

export const TokenizeDemo: React.FunctionComponent = () => {
  const [showSaveSuccessful, setShowSaveSuccessful] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ssn, setSsn] = useState<string | null>(null);

  const uploadFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (ssn === null) {
      setError('Please enter a social security number');
      return;
    }
    try {
      const tokenizerResponse = await tokenizer.tokenize(ssn);
      if (!tokenizerResponse.success) {
        setError(tokenizerResponse.error.toString());
        return;
      }
      const { data } = await axios.post<ApiResponse>(`http://localhost:3001/user/set-ssn`, {
        ssn_token: tokenizerResponse.tokenId,
      });
      if (!data.success) {
        setError(data.error);
        return;
      }
      setShowSaveSuccessful(true);
    } catch (e) {
      setError((e as Error).toString());
    }
  };

  function renderErrors() {
    if (error !== null) {
      return (
        <Alert
          onClose={() => {
            setError(null);
          }}
          severity="error"
          id="success-alert"
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      );
    }
    return null;
  }

  function renderSuccessMessage() {
    if (showSaveSuccessful) {
      return (
        <Alert
          onClose={() => {
            setShowSaveSuccessful(false);
          }}
          severity="success"
          id="success-alert"
        >
          <AlertTitle>Success</AlertTitle>
          Social Security Number has been Tokenized and Saved
        </Alert>
      );
    }
    return null;
  }

  return (
    <Grid item xs={12}>
      <Card>
        {/*<CardHeader title={`User: ${user.username}`} />*/}
        <CardContent>
          {renderSuccessMessage()}
          {renderErrors()}
          <form name="secure-form-example" onSubmit={(e) => uploadFormData(e)}>
            <FormGroup>
              <FormLabel htmlFor="ssn-token-input">Social Security Number</FormLabel>
              {/* Here we are using Material with the LunaSec Secure Input instead of using SecureInput directly.  Experimental */}
              <TextField variant="outlined" onChange={(e) => setSsn(e.target.value)} />
            </FormGroup>
            <div>
              <Button variant="outlined" color="primary" style={{ textTransform: 'none' }} type="submit">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};
