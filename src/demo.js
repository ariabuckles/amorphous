import * as React from 'react';

import { AppComponent, RootAppComponent } from './amorphous';

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

  componentDidUpdate(prevProps, prevState, snapshot, prevAppState) {
    console.log('componentDidUpdate: prev: ',
      prevProps, prevState, prevAppState
    );
    console.log('componentDidUpdate: next: ',
      this.props, this.state, this.appState
    );
  }
}

class App extends RootAppComponent {
  constructor(props) {
    super(props);
    this.appState = {text: 'hi'};
  }

  static getDerivedAppState = (appState) => {
    return {
      length: appState.text.length,
    };
  }

  render() {
    return (
      <div className="App">
        <Input iProp="i" />
        <Output oProp="o" />
        <span> : {this.appState.length}</span>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot, prevAppState) {
    console.log('ROOT componentDidUpdate: prev: ',
      prevProps, prevState, prevAppState
    );
    console.log('ROOT componentDidUpdate: next: ',
      this.props, this.state, this.appState
    );
  }
}

export default App;
