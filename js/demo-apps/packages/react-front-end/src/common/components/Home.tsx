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
import { Box, Card, CardContent, CardHeader, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import logo from '../../static/logo.svg';

const useStyles = makeStyles(() => ({
  LogoImg: {
    width: 300,
    paddingBottom: 5,
  },
}));

export const Home: React.FunctionComponent = () => {
  const classes = useStyles({});
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <img alt="LunaSec Logo" src={logo} className={classes.LogoImg} />
          <h1>LunaSec Demo: Dedicated Tokenizer with Passport Authentication</h1>
          <Typography>
            This is a fully functional application which uses LunaSec to protect it&apos;s sensitive data.
          </Typography>
          <br />
          <Typography>
            It looks like a normal app because it was designed to! Under the hood though, there is a lot of black magic
            happening. Check out the{' '}
            <a href="https://www.lunasec.io/docs/pages/overview/demo-app/walkthrough/" target="_blank" rel="prefetch">
              Demo App Walkthrough Guide
            </a>{' '}
            if you find yourself confused.
          </Typography>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title="Getting Started" />
        <Divider />
        <CardContent>
          <Typography>
            Before trying the LunaSec Secure Elements, you must first login to the site by using the links on the left.
            A test user has been created for you already for you to login with.
            <h4>Login Credentials:</h4>
            <ul>
              <li>
                Username: <b>test</b>
              </li>
              <li>
                Password: <b>test</b>
              </li>
            </ul>
            <p>
              You may also register a new user with any username and password. Once you&apos;ve logged in, you will see
              a list of elements on the left that you can try in order to explore the app.
            </p>
            <Divider />
            <p>
              Selecting from a mode with the buttons in the header will switch between different demos. Each demo runs
              with a different backend service and provides a reference for the different ways that you can integrate
              LunaSec into your stack.
            </p>
            <Divider />
            <p>
              <h4>Ideas To Begin:</h4>
              <ul>
                <li>Use your browser&apos;s Dev Tools to inspect the input elements in the example pages.</li>
                <li>
                  Look at the network traffic to see the communication with the local AWS S3 bucket to store encrypted
                  data.
                </li>
                <li>
                  Review the{' '}
                  <a
                    href="https://github.com/lunasec-io/lunasec/tree/master/js/demo-apps/packages"
                    target="_blank"
                    rel="prefetch"
                  >
                    source code
                  </a>{' '}
                  behind this app to start understanding how it works.
                </li>
                <li>
                  Simulate an attack by trying to leak the sensitive data in the examples. An attacker that is able to
                  inject malicious JavaScript into a website is a realistic attack to test out.
                </li>
              </ul>
            </p>
          </Typography>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title="Resources" />
        <Divider />
        <CardContent>
          <Typography>
            <Box mt={-2}>
              <h3>Documentation Links</h3>
            </Box>
            <ul>
              <li>
                <b>
                  <a href="https://www.lunasec.io/docs/pages/overview/introduction/" target="_blank" rel="prefetch">
                    Main Documentation
                  </a>
                  :
                </b>{' '}
                This is the general documentation and is a helpful place to get started with LunaSec.
              </li>

              <li>
                <b>
                  <a
                    href="https://www.lunasec.io/docs/pages/getting-started/dedicated-tokenizer/introduction/"
                    target="_blank"
                    rel="prefetch"
                  >
                    Getting Started Guide
                  </a>
                  :
                </b>{' '}
                A specific guide for setting up the Secure Components in your own application.
              </li>

              <li>
                <b>
                  <a
                    href="https://www.lunasec.io/docs/pages/overview/demo-app/walkthrough/"
                    target="_blank"
                    rel="prefetch"
                  >
                    Demo App Walkthrough
                  </a>
                  :
                </b>{' '}
                An overview of this Demo App, how to use it, and a walkthrough of architecture (with links to the source
                code).
              </li>
            </ul>
            <p>On behalf of the LunaSec Development Team, thank you for checking us out!</p>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
