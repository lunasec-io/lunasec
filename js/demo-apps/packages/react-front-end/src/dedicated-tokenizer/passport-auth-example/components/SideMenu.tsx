import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { ChatBubbleOutline, CloudUpload, FormatTextdirectionLToR, Home, LockOpen, VpnKey } from '@material-ui/icons';
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
        <ListItem button component={NavLink} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {!loggedIn ? (
          <ListItem button component={NavLink} to="/signup">
            <ListItemIcon>
              <VpnKey />
            </ListItemIcon>
            <ListItemText primary="Signup" />
          </ListItem>
        ) : null}
        {!loggedIn ? (
          <ListItem button component={NavLink} to="/login">
            <ListItemIcon>
              <LockOpen />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        ) : null}
        {loggedIn ? (
          <ListItem button component={NavLink} to="/secureinput">
            <ListItemIcon>
              <ChatBubbleOutline />
            </ListItemIcon>
            <ListItemText primary="SecureInput" />
          </ListItem>
        ) : null}
        {loggedIn ? (
          <ListItem button component={NavLink} to="/secureupload">
            <ListItemIcon>
              <CloudUpload />
            </ListItemIcon>
            <ListItemText primary="SecureUpload" />
          </ListItem>
        ) : null}
        {loggedIn ? (
          <ListItem button component={NavLink} to="/secureparagraph">
            <ListItemIcon>
              <FormatTextdirectionLToR />
            </ListItemIcon>
            <ListItemText primary="SecureParagraph" />
          </ListItem>
        ) : null}
      </List>
    </Drawer>
  );
};
