import { LunaSecConfigContext } from '@lunasec/react-sdk';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // Pages

import { Documents } from './components/Documents';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { SideMenu } from './components/SideMenu';
import { Signup } from './components/Signup';
import { Usage } from './components/Usage';
import { User } from './components/User';

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

export const DedicatedPassportReactApp = () => {
  const classes = useStyles({});

  return (
    <LunaSecConfigContext.Provider
      value={{
        lunaSecDomain: 'http://localhost:37766',
        authenticationErrorHandler: (e: Error) => {
          // setAuthError('Failed to authenticate with LunaSec. \n Is a user logged in?');
          console.error('AUTH ERROR FROM LUNASEC', e);
        },
      }}
    >
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <SideMenu />
          <main className={classes.main}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/usage" component={Usage} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/user" component={User} />
              <Route exact path="/documents" component={Documents} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </LunaSecConfigContext.Provider>
  );
};
