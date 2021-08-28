import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { DedicatedPassportReactApp } from './dedicated-tokenizer/passport-auth-example/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <DedicatedPassportReactApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
void reportWebVitals();
