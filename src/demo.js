import * as React from 'react';

import { AppComponent, RootAppComponent } from './amorphous';

class Input extends AppComponent {
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
  render() {
    return (
      <span>
        {'You typed: '}
        {this.appState.text}
      </span>
    );
  }
}

class App extends RootAppComponent {
  appState = { text: 'hi' };

  render() {
    return (
      <div>
        <Input />
        <Output />
      </div>
    );
  }
}

export default App;
