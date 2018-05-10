import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { AppStateContainer, AppComponent } from './set-app-state';

class Input extends AppComponent {
  render() {
    return <input
      type="text"
      value={this.appState.text}
      onChange={e => this.setAppState({text: e.target.value})}
    />;
  }
}

class Output extends AppComponent {
  render() {
    return <span>
      {'You typed: '}
      {this.appState.text}
    </span>;
  }
}

class App extends Component {
  render() {
    return (
      <AppStateContainer appState={{text: 'hi'}}>
        <div className="App">
          <Input />
          <Output />
        </div>
      </AppStateContainer>
    );
  }
}

export default App;
