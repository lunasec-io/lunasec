import React from 'react';
import {SecureForm, SecureInput} from 'secure-frame-sdk';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-form">
        <SecureForm onSubmit={(formData) => console.log('react form data', formData)}>
          <SecureInput name="foo" />
          <SecureInput name="bar" token="not a real token" />
          <input type="submit" />
        </SecureForm>
      </div>
    </div>
  );
}

export default App;
