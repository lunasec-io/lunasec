import React from 'react';
import {SecureForm, SecureInput} from '@esluna/secure-frame-react-sdk';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-form">
        <SecureForm onSubmit={(formData) => console.log('react form data', formData)}>
          <SecureInput name="foo" token="50d14625-a605-4eb9-a908-9f3733c3f19d"/>
          <SecureInput name="bar" token="49f7bea4-2057-4dea-8f57-88025b9e6a61" />
          <input type="submit" />
        </SecureForm>
      </div>
    </div>
  );
}

export default App;
