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
import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { useStoreActions, useStoreState } from '../store';
import { Transport } from '../types';

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
    sideBarButton: {
      marginRight: '10px',
      color: 'white',
    },
    loggedInStatus: {
      marginRight: '30px',
    },
    modeSelect: {
      // marginLeft: '20x',
      // background: 'white',
      // borderRadius: '10px',
      color: 'white',
    },
  })
);

// TODO: De-dupe this code with the other header
export const Header: React.FunctionComponent<{
  transport: Transport;
}> = (props) => {
  const classes = useStyles({});
  const user = useStoreState((state) => state.user);
  const loadUser = useStoreActions((actions) => actions.loadUser);

  const sidebarOpen = useStoreState((state) => state.sidebarOpen);
  const setSidebarOpen = useStoreActions((actions) => actions.setSidebarOpen);

  useEffect(() => {
    void loadUser({ transport: props.transport }); // Small hack to do this here but it makes sure the user is loaded whenever a page refreshes, ideally would happen in a dedicated component mounted in App
  }, [loadUser, props.transport]);

  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const showLoggedInStatus = () => {
    if (!onDesktop) {
      return null;
    }
    if (user) {
      return (
        <Typography className={classes.loggedInStatus} id="user-status">{`Logged in: ${user.username}`}</Typography>
      );
    }
    return (
      <Typography className={classes.loggedInStatus} id="user-status">
        Not Logged In
      </Typography>
    );
  };

  function LeftHeaderContent() {
    if (!onDesktop) {
      // hamburger icon shows the drawer on click

      return (
        <IconButton
          className={classes.sideBarButton}
          edge="start"
          aria-label="open drawer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          size="large"
        >
          <MenuIcon />
        </IconButton>
      );
    }

    return (
      <Typography variant="h6" noWrap className={classes.title}>
        LunaSec Example App
      </Typography>
    );
  }

  const history = useHistory();

  // When the mode switch button is pushed, this sets the hash and refreshes the page to the desired demo
  const handleModeChange = (event: SelectChangeEvent<string | null>) => {
    const value = event.target.value;
    console.log('selected value ', value);
    if (!value || typeof value !== 'string') {
      return;
    }

    history.push(`/${encodeURIComponent(value)}`);
  };

  const match = useRouteMatch<{ mode: string }>('/:mode');

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {LeftHeaderContent()}
        {showLoggedInStatus()}
        {/*<InputLabel id="mode-selector-label">Mode</InputLabel> doesnt work and unclear why */}
        <Select
          className={classes.modeSelect}
          id="mode-selector"
          labelId="mode-selector-label"
          value={match && match.params.mode}
          autoWidth
          label="Mode"
          onChange={(e) => handleModeChange(e)}
          aria-label="backend mode"
        >
          <MenuItem value="express">Mode: Express</MenuItem>
          <MenuItem value="graphql">Mode: Graphql</MenuItem>
          <MenuItem value="simple">Mode: Simple</MenuItem>
        </Select>
        {/*<FormHelperText>Backend Mode</FormHelperText>*/}
      </Toolbar>
    </AppBar>
  );
};
