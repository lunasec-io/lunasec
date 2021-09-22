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
import { CardHeader, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
          <hr />
          <Typography>
            You can login to is this site with the credentials - username: <b>test</b> password: <b>test</b>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
