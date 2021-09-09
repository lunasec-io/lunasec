import { SecureForm, SecureInput } from '@lunasec/react-sdk';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import React, { useState } from 'react';

import { useStoreActions, useStoreState } from '../../store';
import { ApiResponse } from '../../types';

export const SecureInputDemo: React.FunctionComponent = () => {
  const [showSaveSuccessful, setShowSaveSuccessful] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ssnToken, setSsnToken] = useState<string | null>(null);
  const [ssnValid, setSsnValid] = useState<boolean>(true);

  const user = useStoreState((state) => state.user);
  const setSsn = useStoreActions((state) => state.setSsn);

  const uploadFormData = async () => {
    if (ssnToken === null) {
      setError('Please enter a social security number');
      return;
    }
    const { data } = await axios.post<ApiResponse>(`/user/set-ssn`, {
      ssnToken: ssnToken,
    });
    if (!data.success) {
      setError(JSON.stringify(data.error));
      return;
    }
    setShowSaveSuccessful(true);
    // Note that we can locally store and read the token in other components without re-fetching it because a Read Grant was automatically created with the token
    setSsn(ssnToken);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ssnValid) {
      void uploadFormData();
    }
  };

  if (!user) {
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

  // These props are predefined like this to preserve the strong typing.
  // We are being fancy here and passing these into MaterialUi,
  // but if you want to use SecureInput directly just pass these directly into it
  const secureInputProps: React.ComponentProps<typeof SecureInput> = {
    id: 'ssn-token-input',
    name: 'ssn',
    type: 'ssn',
    validator: 'SSN',
    onValidate: (isValid: boolean) => setSsnValid(isValid),
    token: user.ssn_token || undefined,
    placeholder: 'XXX-XX-XXXX',
    onChange: (e) => setSsnToken(e.target.value),
    errorHandler: (e) => setError(e.message),
  };

  function renderAlerts() {
    return (
      <>
        {error !== null ? (
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
        ) : null}
        {showSaveSuccessful ? (
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
        ) : null}
      </>
    );
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={`User: ${user.username}`} />
        <CardContent>
          {renderAlerts()}
          <SecureForm name="secure-form-example" onSubmit={(e) => handleFormSubmit(e)}>
            <FormGroup>
              <FormLabel htmlFor="ssn-token-input">Social Security Number</FormLabel>
              {/* Here we are using Material with the LunaSec Secure Input instead of using SecureInput directly.  Experimental */}
              <TextField
                error={!ssnValid}
                helperText={ssnValid ? '' : 'Invalid Format'}
                variant="outlined"
                // label="Labels don't work quite right yet"
                InputProps={{
                  /*
                  // @ts-ignore */
                  inputComponent: SecureInput,
                  inputProps: secureInputProps,
                }}
              ></TextField>
            </FormGroup>
            <div>
              <Button variant="outlined" color="primary" style={{ textTransform: 'none' }} type="submit">
                Save
              </Button>
            </div>
          </SecureForm>
        </CardContent>
      </Card>
    </Grid>
  );
};
