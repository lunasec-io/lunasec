import { CssBaseline, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'; // Pages

import { Header } from './components/Header';
import { SideMenu } from './components/SideMenu';
import { DetokenizeDemo } from './components/secure-components/Detokenize';
import { TokenizeDemo } from './components/secure-components/TokenizeDemo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    main: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  })
);

export const SimpleApp = () => {
  const classes = useStyles({});

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <SideMenu />
        <main className={classes.main}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/tokenize" />{' '}
            </Route>
            <Route exact path="/tokenize" component={TokenizeDemo} />
            <Route exact path="/detokenize" component={DetokenizeDemo} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};
