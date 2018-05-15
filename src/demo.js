import * as React from 'react';

import { AppComponent, RootAppComponent, createAppStateContext } from './amorphous';

const MyAppStateContext = createAppStateContext();
class MyAppComponent extends AppComponent {
  appStateContext = MyAppStateContext;
}
class MyRootAppComponent extends RootAppComponent {
  appStateContext = MyAppStateContext;
}

class Input extends MyAppComponent {

  render() {
    return (
      <input
        type="text"
        value={this.appState.text || 'null'}
        onChange={(e) => this.setAppState({ text: e.target.value })}
      />
    );
  }
}

class Output extends MyAppComponent {
  render() {
    return (
      <span>
        {'You typed: '}
        {this.appState.text}
      </span>
    );
  }
}

class App extends MyRootAppComponent {
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
