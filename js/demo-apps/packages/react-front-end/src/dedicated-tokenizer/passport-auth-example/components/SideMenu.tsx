import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { AccountCircle, Folder, Home, LockOpen, VpnKey } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

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
        <ListItem button component={NavLink} to="/signup">
          <ListItemIcon>
            <VpnKey />
          </ListItemIcon>
          <ListItemText primary="Signup" />
        </ListItem>
        <ListItem button component={NavLink} to="/login">
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={NavLink} to="/secureinput">
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="SecureInput" />
        </ListItem>
        <ListItem button component={NavLink} to="/secureupload">
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText primary="SecureUpload" />
        </ListItem>
        <ListItem button component={NavLink} to="/secureparagraph">
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText primary="SecureParagraph" />
        </ListItem>
      </List>
    </Drawer>
  );
};
