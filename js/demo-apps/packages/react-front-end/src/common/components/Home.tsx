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
