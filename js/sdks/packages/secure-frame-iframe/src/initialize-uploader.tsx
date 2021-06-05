import React from 'react';
import ReactDOM from 'react-dom';

import Uploader from './uploader-component';

export function initializeUploader(e: HTMLInputElement, tokens: [string]) {
  console.log('tokens for uploader are ', tokens);
  // bit of a hack on our earlier executed code to remove the element
  // TODO: rewrite the whole secure frame as a react app instead
  const body = document.getElementsByTagName('BODY')[0];
  body.removeChild(e);

  const wrapper = document.createElement('div');
  body.appendChild(wrapper);

  ReactDOM.render(
    <React.StrictMode>
      <Uploader filetokens={tokens} />
    </React.StrictMode>,
    wrapper
  );
}
