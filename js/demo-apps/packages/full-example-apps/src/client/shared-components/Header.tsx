import { AppBar, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import {exampleApplicationName, tokenizerType} from "../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Header: React.FunctionComponent = () => {
  const classes = useStyles({});

  return (
      <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
              <Typography variant='h6' noWrap className={classes.title}>
                LunaSec Example App
              </Typography>
              <Typography>
                {`${tokenizerType} / ${exampleApplicationName}`}
              </Typography>
          </Toolbar>
      </AppBar>
  );
};
