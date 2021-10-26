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
import { Card, CardContent, CardHeader, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
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
            This is a fully functional application which uses LunaSec to protect its sensitive data.
          </Typography>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title="How to sign in and use this Demo" />
        <CardContent>
          <Typography>
            Before trying the LunaSec secure elements you must first login to the site with the links on the left. A
            test user has been premade and you can login with
            <p>
              username: <b>test</b>
            </p>
            <p>
              password: <b>test</b>
            </p>
            or register a new user with any username and password. Then you will see a list of elements on the left that
            you can try.
            <Divider />
            <p>
              Selecting from a mode with the buttons in the header will switch between different demos. You may need to
              sign in again.
            </p>
          </Typography>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title="Understanding how it works" />
        <CardContent>
          <Typography>
            <p>
              For an overview of LunaSec, please see the{' '}
              <a href="https://www.lunasec.io/docs/pages/overview/introduction/">documentation</a>.
            </p>
            <Divider />

            <p>
              To jump into a guide of how to set up the Secure Components you see in this demo in your own application,
              see the{' '}
              <a href="https://www.lunasec.io/docs/pages/getting-started/dedicated-tokenizer/introduction/">
                getting started guide
              </a>
              .
            </p>
            <Divider />

            <p>
              For an overview of how this demo app is programmed, including links to the source code,{' '}
              <a href={'https://www.lunasec.io/docs/pages/overview/demo-app/walkthrough/'}>click here</a>.
            </p>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
