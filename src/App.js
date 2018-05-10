import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { AppStateContainer, AppComponent, RootComponent } from './set-app-state';

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
  shouldComponentUpdate(nextProps, nextState, nextAppState) {
    console.log('shouldComponentUpdate: prev: ',
      this.props, this.state, this.appState
    );
    console.log('shouldComponentUpdate: next: ',
      nextProps, nextState, nextAppState
    );
    console.log('---');
    return nextAppState.text !== this.appState.text;
  }

  render() {
    return <span>
      {'You typed: '}
      {this.appState.text}
    </span>;
  }
}

class App extends RootComponent {
  constructor(props) {
    super(props);
    this.appState = {text: 'hi'};
  }

  render() {
    return (
      <div className="App">
        <Input iProp="i" />
        <Output oProp="o" />
      </div>
    );
  }
}

export default App;
