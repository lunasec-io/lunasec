import { UserModel } from '@lunasec/demo-back-end/build/types';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useStoreState } from '../store';
import { CurrentUserResponse } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const Header: React.FunctionComponent = () => {
  const classes = useStyles({});
  const user = useStoreState((state) => state.user);

  const showLoggedInStatus = () => {
    if (user) {
      return <Typography>{`Logged in: ${user.username}`}</Typography>;
    }
    return <Typography>Not Logged In</Typography>;
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          LunaSec Example App
        </Typography>
        {showLoggedInStatus()}
      </Toolbar>
    </AppBar>
  );
};
