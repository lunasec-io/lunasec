/* eslint-disable react/jsx-no-target-blank */
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
import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Route } from 'react-router-dom'; // Pages

import logo from '../static/logo.svg';

import { DetokenizeDemo } from './components/secure-components/Detokenize';
import { TokenizeDemo } from './components/secure-components/TokenizeDemo';

const useStyles = makeStyles(() => ({
  LogoImg: {
    width: 300,
    paddingBottom: 5,
  },
}));

export const SimpleApp = () => {
  const classes = useStyles({});

  return (
    <>
      <Route exact path="/simple">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <img alt="LunaSec Logo" src={logo} className={classes.LogoImg} />
              <h1>LunaSec Demo: Simple tokenizer</h1>
              <Typography>
                This application uses the LunaSec Simple Tokenizer. It&apos;s less sophisticated than the dedicated
                tokenizer, but it does not require any dedicated infrastructure to run.
              </Typography>
              <br />
              <Typography>
                You can read more about the tradeoffs{' '}
                <a
                  href="https://www.lunasec.io/docs/pages/getting-started/choose-your-setup/"
                  target="_blank"
                  rel="prefetch"
                >
                  here
                </a>
                .
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Route>
      <Route path="/simple/tokenize" component={TokenizeDemo} />
      <Route path="/simple/detokenize" component={DetokenizeDemo} />
    </>
  );
};
