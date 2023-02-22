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
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { LoadSession } from './components/auth/LoadSession';
import { LayoutProvider } from './contexts/LayoutContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { WizardOpenProvider } from './contexts/WizardContext';
import { routes } from './routes';
import { store } from './store/store';
import { startAtlas } from './utils/start-atlas-session-recording';

function App(): JSX.Element {
  const content = useRoutes(routes);
  if (process.env.ANALYTICS_ENABLED !== 'FALSE') {
    startAtlas();
  }

  // Canonical URL so that Google doesn't index the ELB URL
  // https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls#rel-canonical-link-method
  const canonicalUrl = `${process.env.REACT_APP_BASE_URL}${window.location.pathname}`;

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | LunaTrace - Dependency Analysis and Live Tracking"
        defaultTitle="LunaTrace - Dependency Analysis and Live Tracking"
        prioritizeSeoTags={true}
      >
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <StoreProvider store={store}>
        <LoadSession>
          <ThemeProvider>
            <UserProvider>
              <SidebarProvider>
                <LayoutProvider>
                  <WizardOpenProvider>
                    <QueryParamProvider adapter={ReactRouter6Adapter}>{content}</QueryParamProvider>
                  </WizardOpenProvider>
                </LayoutProvider>
              </SidebarProvider>
            </UserProvider>
          </ThemeProvider>
        </LoadSession>
      </StoreProvider>
    </HelmetProvider>
  );

  return <div className="App">hi</div>;
}

export default App;
