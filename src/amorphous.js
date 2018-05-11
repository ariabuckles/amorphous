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


const setNewAppState = (setState, context, args) => {
  let path = [];
  let i = 0;
  while (i < args.length && (typeof args[i] === 'string')) {
    path.push(args[i]);
    i++;
  }
  const update = args[i];
  const callback = args[i + 1];
  setState.call(
    context,
    state => getNewAppStateRecursive(path, 0, state, update),
    callback
  );
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


const wrapMethod = (lifeCycleMethod, methodWrapper) => {
  if (typeof lifeCycleMethod !== 'function') {
    return lifeCycleMethod;
  }

  return function(...args) {
    return methodWrapper.call(this, lifeCycleMethod, args);
  }
};


export class AppStateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.appState || {};
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
    setNewAppState(this.setState, this, args);
  }
}

export class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    const rawRender = this.render;

    this.__AppComponentProxy = proxyLifecycleMethodsFor(this);
    // This *must* be rawrender, as proxyLifecycleMethodsFor modifies `this`:
    this.render = wrapMethod(rawRender, AppComponent.prototype.wrapRender);
  }

  // Todo just replace render entirely
  wrapRender(render, args) {
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
    const rawRender = this.render;

    this.__AppComponentProxy = proxyLifecycleMethodsFor(this);
    // This *must* be rawrender, as proxyLifecycleMethodsFor modifies `this`:
    this.render = wrapMethod(rawRender, RootAppComponent.prototype.wrapRender);

    // This should usually be overwritten with a default value by derived class
    this.appState = {};
  }

  // Todo just replace render entirely
  wrapRender(render, args) {
    return <AppStateContainer appState={this.appState}>
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

