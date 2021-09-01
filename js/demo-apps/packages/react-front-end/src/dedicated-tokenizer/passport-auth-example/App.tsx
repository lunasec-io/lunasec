import { LunaSecConfigContext } from '@lunasec/react-sdk';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import { StoreProvider } from 'easy-peasy';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // Pages

import { Header } from './components/Header';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { SecureInputDemo } from './components/SecureInputDemo';
import { SecureParagraphDemo } from './components/SecureParagraphDemo';
import { SecureUploadDemo } from './components/SecureUploadDemo';
import { SideMenu } from './components/SideMenu';
import { Signup } from './components/Signup';
import { Usage } from './components/Usage';
import { store, useStoreActions } from './store';

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
      <StoreProvider store={store}>
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
                <Route exact path="/secureinput" component={SecureInputDemo} />
                <Route exact path="/secureupload" component={SecureUploadDemo} />
                <Route exact path="/secureparagraph" component={SecureParagraphDemo} />
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      </StoreProvider>
    </LunaSecConfigContext.Provider>
  );
};
