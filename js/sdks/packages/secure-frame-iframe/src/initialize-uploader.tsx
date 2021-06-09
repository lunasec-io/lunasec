import { AllowedElements } from '@lunasec/react-sdk';
import React from 'react';
import ReactDOM from 'react-dom';

import { SecureFrame } from './secure-frame';
import Uploader from './uploader-component';

// Bootstrap a react app to handle file uploading
export function initializeUploader(secureFrame: SecureFrame<keyof AllowedElements>, tokens: string[]) {
  // TODO: rewrite the whole secure frame as a react app instead
  // bit of a hack on our earlier executed code to remove the element
  document.body.removeChild(secureFrame.secureElement);

  const appWrapper = document.createElement('div');
  document.body.appendChild(appWrapper);

  ReactDOM.render(
    <React.StrictMode>
      <Uploader filetokens={tokens} secureframe={secureFrame} />
    </React.StrictMode>,
    appWrapper
  );
}
