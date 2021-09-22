import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  ChatBubbleOutline,
  CloudUpload,
  FormatTextdirectionLToR,
  GetApp,
  Home,
  LockOpen,
  VpnKey,
} from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { useStoreState } from '../store';

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

function renderLoginSignupLinks() {
  return (
    <>
      <ListItem button component={NavLink} to={{ pathname: '/signup', hash: window.location.hash }}>
        <ListItemIcon>
          <VpnKey />
        </ListItemIcon>
        <ListItemText primary="Signup" />
      </ListItem>
      <ListItem button component={NavLink} to={{ pathname: '/login', hash: window.location.hash }}>
        <ListItemIcon>
          <LockOpen />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    </>
  );
}

function renderSecureComponentLinks() {
  return (
    <>
      <ListItem button component={NavLink} to={{ pathname: '/secureinput', hash: window.location.hash }}>
        <ListItemIcon>
          <ChatBubbleOutline />
        </ListItemIcon>
        <ListItemText primary="SecureInput" />
      </ListItem>
      <ListItem button component={NavLink} to={{ pathname: '/secureparagraph', hash: window.location.hash }}>
        <ListItemIcon>
          <FormatTextdirectionLToR />
        </ListItemIcon>
        <ListItemText primary="SecureParagraph" />
      </ListItem>
      <ListItem button component={NavLink} to={{ pathname: '/secureupload', hash: window.location.hash }}>
        <ListItemIcon>
          <CloudUpload />
        </ListItemIcon>
        <ListItemText primary="SecureUpload" />
      </ListItem>

      <ListItem button component={NavLink} to={{ pathname: '/securedownload', hash: window.location.hash }}>
        <ListItemIcon>
          <GetApp />
        </ListItemIcon>
        <ListItemText primary="SecureDownload" />
      </ListItem>
      <ListItem button component={NavLink} to={{ pathname: '/securetextarea', hash: window.location.hash }}>
        <ListItemIcon>
          <GetApp />
        </ListItemIcon>
        <ListItemText primary="SecureTextArea" />
      </ListItem>
    </>
  );
}

export const SideMenu: React.FunctionComponent = () => {
  const classes = useStyles({});
  const loggedIn = useStoreState((state) => state.loggedIn);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button component={NavLink} to={{ pathname: '/', hash: window.location.hash }}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {!loggedIn && renderLoginSignupLinks()}
        {loggedIn && renderSecureComponentLinks()}
      </List>
    </Drawer>
  );
};
