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
import { ComponentNames } from '@lunasec/react-sdk';
import React from 'react';
import ReactDOM from 'react-dom';

import { SecureFrame } from './secure-frame';
import Uploader from './uploader-component';

// Bootstrap a react app to handle file uploading
export function initializeUploader(secureFrame: SecureFrame<ComponentNames>, tokens: string[]) {
  // TODO: rewrite the whole secure frame as a react app instead
  // bit of a hack on our earlier executed code to remove the element
  secureFrame.secureElement.remove();

  const appWrapper = document.createElement('div');
  document.body.appendChild(appWrapper);

  ReactDOM.render(
    <React.StrictMode>
      <Uploader filetokens={tokens} secureframe={secureFrame} />
    </React.StrictMode>,
    appWrapper
  );
}
