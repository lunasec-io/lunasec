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
