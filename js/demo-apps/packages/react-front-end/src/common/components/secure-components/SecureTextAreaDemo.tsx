import { SecureForm, SecureParagraph, SecureTextArea } from '@lunasec/react-sdk';
import { Button, Card, CardContent, CardHeader, FormGroup, FormLabel, Grid, Typography } from '@material-ui/core';
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
        <CardHeader title={`SecureTextArea`} />
        <CardContent>
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
