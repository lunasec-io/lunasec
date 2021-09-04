import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { DedicatedPassportReactApp } from './dedicated-tokenizer/passport-auth-example/App';

ReactDOM.render(
  <React.StrictMode>
    <DedicatedPassportReactApp />
  </React.StrictMode>,
  document.getElementById('root')
);
