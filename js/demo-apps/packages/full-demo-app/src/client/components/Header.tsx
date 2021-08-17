import { AppBar, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Header: React.FunctionComponent = () => {
  const classes = useStyles({});

  const redirectToLogin = () => {
      window.location.href = '/api/user/login';
  }

  return (
      <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
              <Typography variant='h6' noWrap className={classes.title}>
                  LunaSec App Example
              </Typography>
              <Button color="inherit" onClick={redirectToLogin}>Login</Button>
          </Toolbar>
      </AppBar>
  );
};
