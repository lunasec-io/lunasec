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
import { LunaSecConfigContext } from '@lunasec/react-sdk';
import React from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom'; // Pages

import { Home } from './components/Home';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { SecureDownloadDemo } from './components/secure-components/SecureDownloadDemo';
import { SecureInputDemo } from './components/secure-components/SecureInputDemo';
import { SecureParagraphDemo } from './components/secure-components/SecureParagraphDemo';
import { SecureTextAreaDemo } from './components/secure-components/SecureTextAreaDemo';
import { SecureUploadDemo } from './components/secure-components/SecureUploadDemo';
import { Transport } from './types';

const componentLookup = {
  login: Login,
  signup: Signup,
  secureinput: SecureInputDemo,
  secureupload: SecureUploadDemo,
  secureparagraph: SecureParagraphDemo,
  securedownload: SecureDownloadDemo,
  securetextarea: SecureTextAreaDemo,
};

const RenderDemoComponent: React.FunctionComponent<{ transport: Transport }> = (props) => {
  const { component } = useParams<{ component: keyof typeof componentLookup }>();
  const DemoComponent = componentLookup[component];
  return <DemoComponent transport={props.transport} />;
};

export const DedicatedPassportReactApp: React.FunctionComponent<{
  transport: Transport;
  sessionAuthProvider: string;
}> = (props) => {
  const { sessionAuthProvider } = props;
  const { path } = useRouteMatch();
  return (
    <LunaSecConfigContext.Provider
      value={{
        lunaSecDomain: process.env.REACT_APP_TOKENIZER_URL ? process.env.REACT_APP_TOKENIZER_URL : '',
        sessionAuthProvider: sessionAuthProvider,
        authenticationErrorHandler: (e: Error) => {
          // setAuthError('Failed to authenticate with LunaSec. \n Is a user logged in?');
          console.error('AUTH ERROR FROM LUNASEC', e);
        },
      }}
    >
      <Route exact path={`${path}/`} component={Home} />
      <Route path={`${path}/:component`}>
        <RenderDemoComponent transport={props.transport} />
      </Route>
    </LunaSecConfigContext.Provider>
  );
};
