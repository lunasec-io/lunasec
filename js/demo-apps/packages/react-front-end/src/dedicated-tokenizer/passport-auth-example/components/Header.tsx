import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

import { useStoreActions, useStoreState } from '../store';

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

  const loadUser = useStoreActions((actions) => actions.loadUser);
  useEffect(() => {
    loadUser(); // Small hack to do this here but it makes sure the user is loaded whenever a page refreshes, ideally would happen in a dedicated component mounted in App
  }, []);

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
