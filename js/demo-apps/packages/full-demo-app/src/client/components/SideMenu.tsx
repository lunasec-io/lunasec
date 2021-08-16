import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import UsageIcon from '@material-ui/icons/Code';
import HomeIcon from '@material-ui/icons/Home';
import RouterIcon from '@material-ui/icons/Storage';
import FetchIcon from '@material-ui/icons/CloudDownload';
import StyledIcon from '@material-ui/icons/Style';
import LazyIcon from '@material-ui/icons/SystemUpdateAlt';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {LockOpen} from "@material-ui/icons";

class NavLinkMui extends React.Component<any> {
  render() {
      const { forwardedRef, to, ...props } = this.props
      return <NavLink {...props} ref={forwardedRef} to={to} />
  }
}

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
  }),
);

export const SideMenu: React.FunctionComponent = () => {
  const classes = useStyles({});
  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button component={NavLinkMui} to='/'>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button component={NavLinkMui} to='/signup'>
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText primary='Signup' />
        </ListItem>
      </List>
    </Drawer>
  );
};
