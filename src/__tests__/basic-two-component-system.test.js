import { strict as assert } from 'assert';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { RootAppComponent, AppComponent } from '../amorphous';

describe('Two AppComponent system', () => {
  class Input extends AppComponent {
    shouldComponentUpdate(nextProps, nextState, nextAppState) {
      return nextAppState.text !== this.appState.text;
    }

    render() {
      return (
        <input
          type="text"
          value={this.appState.text}
          onChange={(e) => this.setAppState({ text: e.target.value })}
        />
      );
    }
  }

  class Output extends AppComponent {
    shouldComponentUpdate(nextProps, nextState, nextAppState) {
      return nextAppState.length !== this.appState.length;
    }

    render() {
      return (
        <span>
          {this.appState.length}
        </span>
      );
    }
  }

  class System extends RootAppComponent {
    constructor(props) {
      super(props);
      this.appState = { text: '' };
    }

    static getDerivedAppState = (appState) => {
      return {
        length: appState.text.length,
      };
    };

    render() {
      return (
        <div className="App">
          <Input />
          <Output />
        </div>
      );
    }
  }


});
