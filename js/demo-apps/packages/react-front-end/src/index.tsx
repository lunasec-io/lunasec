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
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import { DedicatedPassportReactApp } from './common/App';
import { Header } from './common/components/Header';
import { SideMenu } from './common/components/SideMenu';
import { getStore, useStoreActions } from './common/store';
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

const modeLookup: Record<string, 'dedicated' | 'simple' | undefined> = {
  express: 'dedicated',
  graphql: 'dedicated',
  simple: 'simple',
} as const;

export const AppContainer: React.FunctionComponent = () => {
  const classes = useStyles({});

  const loadUser = useStoreActions((actions) => actions.loadUser);
  useEffect(() => {
    loadUser(); // Small hack to do this here but it makes sure the user is loaded whenever a page refreshes
  }, [loadUser]);

  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/express" />
      </Route>
      <Route
        path="/:mode"
        render={(routeProps) => {
          const pathMode = routeProps.match && routeProps.match.params.mode;

          const mode = modeLookup[pathMode];

          if (mode && mode !== 'simple' && mode !== 'dedicated') {
            throw new Error('Unknown mode for operation. Must be "simple" or "dedicated"');
          }

          return (
            <div className={classes.root}>
              <CssBaseline />
              <Header loadUser={loadUser} />
              <SideMenu mode={mode} />
              <main className={classes.main}>
                <div className={classes.toolbar} />
                <Route path="/express">
                  <DedicatedPassportReactApp sessionAuthProvider="express-back-end" />
                </Route>
                <Route path="/graphql">
                  <DedicatedPassportReactApp sessionAuthProvider="graphql-back-end" />
                </Route>
                <Route path="/simple">
                  <SimpleApp />
                </Route>
              </main>
            </div>
          );
        }}
      />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={getStore()}>
      {/*programmatically change which app comes up based on the page hash*/}
      <AppContainer />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
