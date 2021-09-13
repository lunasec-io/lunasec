import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { DedicatedPassportReactApp } from './common/App';
import { SimpleApp } from './simple-tokenizer/App';

export function getApp() {
  switch (process.env.REACT_APP_DEMO_NAME) {
    case 'dedicated-passport-express':
      return <DedicatedPassportReactApp />;
    case 'dedicated-passport-graphql':
      return <DedicatedPassportReactApp />; // Same app as above for this demo, it just loads a different store
    case 'simple':
      return <SimpleApp />;
    default:
      throw new Error('Must set DEMO_NAME env var to a suitable demo name');
  }
}

ReactDOM.render(
  <React.StrictMode>
    {/*programmatically change which app comes up based on the ENV*/}
    {getApp()}
  </React.StrictMode>,
  document.getElementById('root')
);
