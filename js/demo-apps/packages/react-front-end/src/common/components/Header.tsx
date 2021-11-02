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
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
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
  })
);

// TODO: De-dupe this code with the other header
export const Header: React.FunctionComponent<{
  transport: Transport;
}> = (props) => {
  const classes = useStyles({});
  const user = useStoreState((state) => state.user);
  const loadUser = useStoreActions((actions) => actions.loadUser);

  useEffect(() => {
    void loadUser({ transport: props.transport }); // Small hack to do this here but it makes sure the user is loaded whenever a page refreshes, ideally would happen in a dedicated component mounted in App
  }, [loadUser, props.transport]);

  const showLoggedInStatus = () => {
    if (user) {
      return <Typography id="user-status">{`Logged in: ${user.username}`}</Typography>;
    }
    return <Typography id="user-status">Not Logged In</Typography>;
  };

  const history = useHistory();

  // When the mode switch button is pushed, this sets the hash and refreshes the page to the desired demo
  const handleModeChange = (_event: React.MouseEvent<HTMLElement>, value: string) => {
    if (!value) {
      return;
    }

    history.push(`/${encodeURIComponent(value)}`);
  };

  const match = useRouteMatch<{ mode: string }>('/:mode');

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          LunaSec Example App
        </Typography>
        <ToggleButtonGroup
          className={classes.toggleButtonGroup}
          exclusive
          value={match && match.params.mode}
          onChange={handleModeChange}
          aria-label="text formatting"
        >
          <ToggleButton id="select-mode-express" value="express" aria-label="express">
            Express
          </ToggleButton>
          <ToggleButton id="select-mode-graphql" value="graphql" aria-label="graphql">
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
