import { CardHeader, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { exampleApplicationName, tokenizerDescriptionLookup, tokenizerType } from '../constants';

const useStyles = makeStyles(() => ({
  LogoImg: {
    width: 150,
    paddingBottom: 25,
  },
}));

export const Home: React.FunctionComponent = () => {
  const classes = useStyles({});
  const tokenizerDescription = tokenizerDescriptionLookup[tokenizerType];
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={`LunaSec ${exampleApplicationName}`} />
        <CardContent>
          <img src='/assets/images/logo.png' className={classes.LogoImg} />
          <Typography>
            This is a fully functional application which uses LunaSec to protect its sensitive data.
          </Typography>
          <Typography>
            This application is using a <b>{tokenizerType}</b>. {tokenizerDescription}.
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
