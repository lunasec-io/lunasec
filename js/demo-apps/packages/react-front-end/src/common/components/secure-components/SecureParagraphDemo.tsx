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
import { SecureParagraph } from '@lunasec/react-sdk';
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core';
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
        <CardHeader title="Secure Paragraph Demo" />
        <CardContent>
          <p>
            The below paragraph element has been tokenized by LunaSec. It displays the data that was saved in the Secure
            Input of the previous demo. It&apos;s in an iFrame and can&apos;t be snooped by JavaScript running on this
            page.
          </p>
          <p>
            To see how to set up your own Secure Paragraph,{' '}
            <a
              href={
                'https://www.lunasec.io/docs/pages/getting-started/dedicated-tokenizer/handling-text/#displaying-secure-data'
              }
            >
              see here
            </a>
            .
          </p>
          <Divider />
          <br />
          {renderErrors()}
          <Typography>Social Security Number:</Typography>
          <SecureParagraph token={user.ssn_token} errorHandler={(e) => setError(e.message)} />
        </CardContent>
      </Card>
    </Grid>
  );
};
