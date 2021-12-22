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
import {
  ChatBubbleOutline,
  CloudUpload,
  FormatTextdirectionLToR,
  GetApp,
  Home,
  Lock,
  LockOpen,
  VpnKey,
} from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { match, NavLink, useRouteMatch } from 'react-router-dom';

import { useStoreActions, useStoreState } from '../store';
import { Mode } from '../types';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  })
);

const RenderLoginSignupLinks: React.FunctionComponent<{ loggedIn: boolean; mode: Mode }> = (props) => {
  const { url } = useRouteMatch();
  const match = useRouteMatch(`${url}/:component`);

  if (props.mode === 'simple') {
    return null;
  }

  if (props.loggedIn) {
    return null;
  }

  return (
    <>
      {renderListItem(<VpnKey />, `${url}/signup`, 'Signup', match)}
      {renderListItem(<LockOpen />, `${url}/login`, 'Login', match)}
    </>
  );
};

function renderListItem<T>(icon: JSX.Element, page: string, text: string, routeMatch: match<T> | null) {
  const selected = routeMatch && routeMatch.url === page;

  return (
    <ListItem button component={NavLink} to={page} selected={selected || false}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

const RenderSecureComponentLinks: React.FunctionComponent<{
  loggedIn: boolean;
  mode: Mode;
}> = (props) => {
  const { url } = useRouteMatch();
  const match = useRouteMatch(`${url}/:component`);

  if (props.mode === 'simple') {
    return (
      <>
        {renderListItem(<Lock />, `${url}/tokenize`, 'Tokenize', match)}
        {renderListItem(<LockOpen />, `${url}/detokenize`, 'Detokenize', match)}
      </>
    );
  }

  if (!props.loggedIn) {
    return null;
  }

  return (
    <>
      {renderListItem(<ChatBubbleOutline />, `${url}/secureinput`, 'SecureInput', match)}
      {renderListItem(<FormatTextdirectionLToR />, `${url}/secureparagraph`, 'SecureParagraph', match)}
      {renderListItem(<CloudUpload />, `${url}/secureupload`, 'SecureUpload', match)}
      {renderListItem(<GetApp />, `${url}/securedownload`, 'SecureDownload', match)}
      {renderListItem(<GetApp />, `${url}/securetextarea`, 'SecureTextArea', match)}
    </>
  );
};

export const SideMenu: React.FunctionComponent<{ mode: Mode }> = (props) => {
  const classes = useStyles({});
  const loggedIn = useStoreState((state) => state.loggedIn);
  const sidebarOpen = useStoreState((state) => state.sidebarOpen);
  const setSidebarOpen = useStoreActions((actions) => actions.setSidebarOpen);

  const { mode } = props;

  const { url } = useRouteMatch();

  const match = useRouteMatch({
    path: url,
    exact: true,
  });

  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const renderResponsiveDrawer = (slot: JSX.Element) => {
    if (!onDesktop) {
      return (
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClick={() => setSidebarOpen(false)} // this should be automatic..but it's not
        >
          {slot}
        </Drawer>
      );
    }

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {slot}
      </Drawer>
    );
  };
  return renderResponsiveDrawer(
    <>
      <div className={classes.toolbar} />
      <List>
        {renderListItem(<Home />, `${url}`, 'Home', match)}
        <RenderLoginSignupLinks loggedIn={loggedIn} mode={mode} />
        <RenderSecureComponentLinks loggedIn={loggedIn} mode={mode} />
      </List>
    </>
  );
};
