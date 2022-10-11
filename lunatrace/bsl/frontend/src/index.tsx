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

import { datadogRum } from '@datadog/browser-rum';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV !== 'development') {
  datadogRum.init({
    applicationId: '9e9042c6-1fd6-4314-a628-782d4fd6810f',
    clientToken: 'pub571912fab56c24ef6732d75a65230513',
    site: 'datadoghq.com',
    proxyUrl: process.env.REACT_DATADOG_RUM_PROXY_URI,
    service: 'lunatrace',
    env: process.env.NODE_ENV,
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sampleRate: 100,
    premiumSampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel: 'mask-user-input',
  });
}

datadogRum.startSessionReplayRecording();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
