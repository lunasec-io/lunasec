import React from 'react';
import {SecureForm, SecureInput} from '@esluna/secure-frame-react-sdk';
// import logo from './logo.svg';
import './App.css';


interface IAppProps {
}

interface IAppState {
    foo?: string
    bar?: string
    savedFoo?: string
    savedBar?: string
}


class App extends React.Component<IAppProps, IAppState> {

    // Retrieves tokens from sessionStorage and sets them to component's state
    constructor(props: IAppProps) {
        super(props);
        this.retrieveTokens();
        setTimeout(() => {
            this.setState({foo:'92d82edc-41dd-443e-8bfc-eb9f0eb006a6'})
            console.log("TIMEOUT FIRED")
        }, 5000)
    }

    handleFooChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({foo: event.target.value})
    }

    handleBarChange(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({bar: event.target.value})
    }

    persistTokens(formEvent: React.FormEvent<HTMLFormElement>) {
        window.sessionStorage.setItem('savedFields', JSON.stringify({
            foo: this.state.foo,
            bar: this.state.bar
        }));
    };

    retrieveTokens(){
        const dataString = window.sessionStorage.getItem('savedFields');
        const savedData = JSON.parse(dataString || "{}") as IAppState; // fail through to empty object if nothing set
        console.log("retrieved Saved Data of ", savedData);
        this.state = ({
            foo: savedData.foo,
            bar: savedData.bar
        });
    }

    render() {
      return <div className="App">
          <div className="app-form">
              <SecureForm onSubmit={(e) => this.persistTokens(e)}>
                  <SecureInput name="foo" value={this.state.foo} onChange={(e) => this.handleFooChange(e)}/>
                  <SecureInput name="bar" value={this.state.bar} onChange={(e) => this.handleBarChange(e)}/>
                  <input type="submit"/>
              </SecureForm>
          </div>
      </div>
    };
};

export default App;
