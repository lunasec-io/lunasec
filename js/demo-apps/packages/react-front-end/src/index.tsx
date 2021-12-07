/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { createStyles, CssBaseline, makeStyles, Theme } from '@material-ui/core';
import { StoreProvider } from 'easy-peasy';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Redirect, Route, useLocation } from 'react-router-dom';

import { DedicatedPassportReactApp } from './common/App';
import { Header } from './common/components/Header';
import { SideMenu } from './common/components/SideMenu';
import { getTransport, store, useStoreActions } from './common/store';
import { Mode } from './common/types';
import { SimpleApp } from './simple-tokenizer/App';

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

export const AppContainer: React.FunctionComponent = () => {
  const classes = useStyles({});
  const location = useLocation();
  const mode = location.pathname.split('/')[1] as Mode; //todo: make this work with react router instead..
  const transport = getTransport(mode);

  const loadUser = useStoreActions((actions) => actions.loadUser);
  useEffect(() => {
    loadUser({ transport });
  }, [loadUser, transport]);

  return (
    <>
      <Route exact path="/">
        <Redirect to="/express" />
      </Route>
      <Route
        path="/:mode"
        render={() => {
          return (
            <div className={classes.root}>
              <CssBaseline />
              <Header transport={transport} />
              <SideMenu mode={mode} />
              <main className={classes.main}>
                <div className={classes.toolbar} />
                <Route path="/express">
                  <DedicatedPassportReactApp sessionAuthProvider="express-back-end" transport={transport} />
                </Route>
                <Route path="/graphql">
                  <DedicatedPassportReactApp sessionAuthProvider="graphql-back-end" transport={transport} />
                </Route>
                <Route path="/simple">
                  <SimpleApp />
                </Route>
              </main>
            </div>
          );
        }}
      />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
