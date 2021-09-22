import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { Lock, LockOpen } from '@material-ui/icons';
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
        <ListItem button component={NavLink} to={{ pathname: '/tokenize', hash: window.location.hash }}>
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          <ListItemText primary="Tokenize" />
        </ListItem>
        <ListItem button component={NavLink} to={{ pathname: '/detokenize', hash: window.location.hash }}>
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText primary="Detokenize" />
        </ListItem>
      </List>
    </Drawer>
  );
};
