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
import { SecureForm, SecureInput } from '@lunasec/react-sdk';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState } from 'react';

import { useStoreActions, useStoreState } from '../../store';
import { Transport } from '../../types';

export const SecureInputDemo: React.FunctionComponent<{
  transport: Transport;
}> = (props) => {
  const [showSaveSuccessful, setShowSaveSuccessful] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ssn_token, setSsnToken] = useState<string | null>(null);
  const [ssnValid, setSsnValid] = useState<boolean>(true);
  const saveSsn = useStoreActions((actions) => actions.saveSsn);

  const user = useStoreState((state) => state.user);
  const uploadFormData = async () => {
    if (ssn_token === null) {
      setError('Please enter a social security number');
      return;
    }
    const data = await saveSsn({ transport: props.transport, ssn_token });
    if (!data.success) {
      setError(JSON.stringify(data.error));
      return;
    }
    setShowSaveSuccessful(true);
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
    customMetadata: { someCustom: 'metadata' },
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
        <CardHeader title={'Secure Input Demo'} />
        <CardContent>
          <p>
            The below input element has been secured with LunaSec. Right click and inspect it to see that it is actually
            inside of an iFrame. A hacker would be unable to read the text even if they were able to embed malicious
            JavaScript into this page.
          </p>
          <p>
            To see how to set up your own Secure Input,{' '}
            <a href={'https://www.lunasec.io/docs/pages/getting-started/dedicated-tokenizer/handling-text/'}>
              see here
            </a>
            .
          </p>
          <Divider />
          <br />
          {renderSuccessMessage()}
          {renderErrors()}
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
              />
            </FormGroup>
            <Box sx={{ mt: 1 }}>
              <Button variant="outlined" color="primary" style={{ textTransform: 'none' }} type="submit">
                Save
              </Button>
            </Box>
          </SecureForm>
        </CardContent>
      </Card>
    </Grid>
  );
};
