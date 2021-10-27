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
import { SecureForm, SecureParagraph, SecureTextArea } from '@lunasec/react-sdk';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState } from 'react';

export const SecureTextAreaDemo: React.FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [textAreaToken, setTextAreaToken] = useState<string | null>(null);

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

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title="Secure Text Area Demo" />
        <CardContent>
          <p>
            This demo shows the Secure Text Area and Secure Paragraph components working together. Right click and
            inspect to see that they're both in iFrames.
          </p>
          <p>
            To see how to set up your own Secure Text Area,{' '}
            <a
              href={'https://www.lunasec.io/docs/pages/getting-started/dedicated-tokenizer/handling-text/#secure-forms'}
            >
              see here
            </a>
            .
          </p>
          <Divider />
          <br />
          <SecureForm
            name="secure-form-example"
            onSubmit={(e) => console.log('form submitted but didnt call server because this example is local only')}
          >
            <FormGroup>
              {renderErrors()}
              <FormLabel htmlFor="ssn-token-input">Tokenize multiple lines of text</FormLabel>
              <SecureTextArea
                style={{ height: '45px' }}
                id="ssn-token-input"
                name="ssn"
                // token={some.prefilled.value}
                onChange={(e) => setTextAreaToken(e.target.value)}
                errorHandler={(e) => setError(e.message)}
              />
            </FormGroup>
            <div>
              <Button variant="outlined" color="primary" style={{ textTransform: 'none' }} type="submit">
                Save
              </Button>
            </div>
          </SecureForm>
        </CardContent>
        <Card>
          <CardContent>
            <Typography>Detokenized Text:</Typography>
            <SecureParagraph
              style={{ whiteSpace: 'break-spaces' }}
              token={textAreaToken || undefined}
              errorHandler={(e) => setError(e.message)}
            />
          </CardContent>
        </Card>
      </Card>
    </Grid>
  );
};
