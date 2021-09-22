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
