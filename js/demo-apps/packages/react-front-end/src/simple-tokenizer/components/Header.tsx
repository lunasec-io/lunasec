import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React from 'react';

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
    },
  })
);

export const Header: React.FunctionComponent = () => {
  const classes = useStyles({});
  const handleModeChange = (_event: React.MouseEvent<HTMLElement>, value: any) => {
    console.log('simple tokenizer received event value', value);
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
          <ToggleButton value="dedicated-passport-express" aria-label="express">
            Express
          </ToggleButton>
          <ToggleButton value="dedicated-passport-graphql" aria-label="graphql">
            GraphQl
          </ToggleButton>
          <ToggleButton value="simple" aria-label="simple">
            Simple
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
