import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { UserResponse } from '../../../common/types';
import { tokenizer } from '../configureTokenizer';

// If you need to change axios settings, do it with axios.create({options}), messing with the global instance can cause issues
export const DetokenizeDemo: React.FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [ssn, setSsn] = useState<string | null>(null);

  const loadSsn = async () => {
    try {
      const { data } = await axios.get<UserResponse>('http://localhost:3003/user/me');
      console.log('server responded ', data);
      if (!data.success) {
        setError(data.error);
        return;
      }
      if (!data.user.ssn_token) {
        setSsn('None Set');
        return;
      }
      const tokenizerResponse = await tokenizer.detokenize(data.user.ssn_token);
      if (!tokenizerResponse.success) {
        setError(tokenizerResponse.error.toString());
        return;
      }
      setSsn(tokenizerResponse.value);
    } catch (e) {
      setError((e as Error).toString());
    }
  };

  useEffect(() => {
    void loadSsn();
  }, []);

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

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title="Detokenized Social Secure Number" />
        <CardContent>
          {renderErrors()}
          <Typography>Social Security Number:</Typography>
          <p>{ssn}</p>
        </CardContent>
      </Card>
    </Grid>
  );
};
