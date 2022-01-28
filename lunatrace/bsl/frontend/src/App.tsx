/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { LayoutProvider } from './contexts/LayoutContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { routes } from './routes';
import { store } from './store/store';

function App() {
  const content = useRoutes(routes);
  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | LunaTrace - Dependency Analysis and Live Tracking"
        defaultTitle="LunaTrace - Dependency Analysis and Live Tracking"
      />
      <Provider store={store}>
        <ThemeProvider>
          <SidebarProvider>
            <LayoutProvider>
              {/*<ChartJsDefaults />*/}
              {/*<AuthProvider>*/}
              {content}
              {/*</AuthProvider>*/}
            </LayoutProvider>
          </SidebarProvider>
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  );

  return <div className="App">hi</div>;
}

export default App;
