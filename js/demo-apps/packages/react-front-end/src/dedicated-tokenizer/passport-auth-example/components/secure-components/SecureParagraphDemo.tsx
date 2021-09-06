import { SecureParagraph } from '@lunasec/react-sdk';
import { Card, CardContent, CardHeader, Grid, makeStyles, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useState } from 'react';

import { useStoreState } from '../../store';

export const SecureParagraphDemo: React.FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const user = useStoreState((state) => state.user);

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

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={`User: ${user.username}`} />
        <CardContent>
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

          <Typography>Social Security Number:</Typography>
          <SecureParagraph token={user.ssn_token} errorHandler={(e) => setError(e.message)} />
        </CardContent>
      </Card>
    </Grid>
  );
};
