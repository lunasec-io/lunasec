import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { DedicatedPassportReactApp } from './common/App';
import { SimpleApp } from './simple-tokenizer/App';

if (!window.location.hash) {
  window.location.hash = 'dedicated-passport-express';
}
const hash = window.location.hash.substring(1);

const mode = hash;

export function getApp() {
  switch (mode) {
    case 'dedicated-passport-express':
      return <DedicatedPassportReactApp sessionAuthProvider="express-back-end" />;
    case 'dedicated-passport-graphql': // Same app for this demo, it just loads a different store
      return <DedicatedPassportReactApp sessionAuthProvider="graphql-back-end" />;
    case 'simple':
      return <SimpleApp />;
    default:
      throw new Error('Invalid demo mode set, check the URL hash');
  }
}

ReactDOM.render(
  <React.StrictMode>
    {/*programmatically change which app comes up based on the page hash*/}
    {getApp()}
  </React.StrictMode>,
  document.getElementById('root')
);
