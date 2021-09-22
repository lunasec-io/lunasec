import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
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
    toggleButtonGroup: {
      backgroundColor: 'white',
      marginRight: '30px',
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
      return <Typography id="user-status">{`Logged in: ${user.username}`}</Typography>;
    }
    return <Typography id="user-status">Not Logged In</Typography>;
  };

  // When the mode switch button is pushed, this sets the hash and refreshes the page to the desired demo
  const handleModeChange = (_event: React.MouseEvent<HTMLElement>, value: any) => {
    if (!value) {
      return;
    }
    window.location.hash = value;
    window.location.reload();
  };

  const hash = window.location.hash.substring(1);
  const mode = hash || 'dedicated-passport-express';

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          LunaSec Example App
        </Typography>
        <ToggleButtonGroup
          className={classes.toggleButtonGroup}
          exclusive
          value={mode}
          onChange={handleModeChange}
          aria-label="text formatting"
        >
          <ToggleButton id="select-mode-express" value="dedicated-passport-express" aria-label="express">
            Express
          </ToggleButton>
          <ToggleButton id="select-mode-graphql" value="dedicated-passport-graphql" aria-label="graphql">
            GraphQl
          </ToggleButton>
          <ToggleButton id="select-mode-simple" value="simple" aria-label="simple">
            Simple
          </ToggleButton>
        </ToggleButtonGroup>
        {showLoggedInStatus()}
      </Toolbar>
    </AppBar>
  );
};
