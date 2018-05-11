import * as React from 'react';
import proxyLifecycleMethodsFor from './proxy-lifecycle-methods-for';


const getNewAppStateRecursive = (path, i, subState, update) => {
  if (i === path.length) {
    return Object.assign({}, subState,
      (typeof update === 'function') ? update(subState) : update
    );
  }
  return Object.assign({}, getNewAppStateRecursive(
    path,
    i + 1,
    subState[path[i]],
    update
  ));
};


const AppStateContext = React.createContext({
  appState: {},
  setAppState: () => {
    throw new Error(
      'Amorphous: to use appState, You must provide a RootAppComponent at the ' +
      'root of your app/library component tree'
    )
  },
});


export class AppStateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.appState || {};
    if (props.getDerivedAppState) {
      this.state = Object.assign(
        {},
        this.state,
        props.getDerivedAppState(this.state)
      );
    }
    this.setAppState = this.setAppState.bind(this);
  }

  render() {
    return <AppStateContext.Provider
      value={{appState: this.state, setAppState: this.setAppState}}
    >
      {this.props.children}
    </AppStateContext.Provider>
  }

  setAppState(...args) {
    let path = [];
    let i = 0;
    while (i < args.length && (typeof args[i] === 'string')) {
      path.push(args[i]);
      i++;
    }
    const update = args[i];
    const callback = args[i + 1];
    this.setState(
      state => {
        let newState = getNewAppStateRecursive(path, 0, state, update);
        if (this.props.getDerivedAppState) {
          // Mutating is okay because newState is ensured to be a new object
          Object.assign(newState, this.props.getDerivedAppState(newState));
        }
        return newState;
      },
      callback
    );
  }
}

export class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.__AppComponentProxy = proxyLifecycleMethodsFor(this);
    this.render = AppComponent.prototype.render;
  }

  render(render, args) {
    return <AppStateContext.Consumer>
      {({appState, setAppState}) => (
        <this.__AppComponentProxy
          props={this.props}
          state={this.state}
          appState={appState}
          setAppState={setAppState}
        />
      )}
    </AppStateContext.Consumer>;
  }
}


export class RootAppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.__AppComponentProxy = proxyLifecycleMethodsFor(this);
    this.render = RootAppComponent.prototype.render;

    // This should usually be overwritten with a default value by derived class
    this.appState = {};
  }

  render(render, args) {
    return <AppStateContainer
      appState={this.appState}
      getDerivedAppState={this.constructor.getDerivedAppState}
    >
      <AppStateContext.Consumer>
        {({appState, setAppState}) => (
          <this.__AppComponentProxy
            props={this.props}
            state={this.state}
            appState={appState}
            setAppState={setAppState}
          />
        )}
      </AppStateContext.Consumer>
    </AppStateContainer>;
  }
}

