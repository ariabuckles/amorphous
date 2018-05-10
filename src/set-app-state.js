import * as React from 'react';

// TODO: Make these better defaults so you don't need a parent provider? 😬
// Or at least present an error message
const StateContext = React.createContext({});
const SetStateContext = React.createContext(() => null);

const wrapMethod = (lifeCycleMethod, methodWrapper) => {
  if (typeof lifeCycleMethod !== 'function') {
    return lifeCycleMethod;
  }

  return function(...args) {
    return methodWrapper.call(this, lifeCycleMethod, args);
  }
};

export class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    const self = this;
    const rawRender = this.render;

    this.appState = null;
    this.__set_app_state = {};

    if (this.shouldComponentUpdate) {
      const shouldComponentUpdate = this.shouldComponentUpdate;
      const SetAppStateComponentWrapper = function(props) {
        React.Component.apply(this, props);
      };
      const SetAppStateSubProto = Object.create(this);
      Object.assign(SetAppStateSubProto, {
        shouldComponentUpdate(nextProps) {
          const props = this.props;
          this.props = self.__set_app_state.prevProps || self.props;
          this.state = self.__set_app_state.prevState || self.state;
          this.appState = props.appState;
          const result = shouldComponentUpdate.call(
            this,
            self.__set_app_state.nextProps || self.props,
            self.__set_app_state.nextState || self.state,
            nextProps.appState
          );
          this.props = props;
          delete this.appState; // send back to the prototype chain
          return result;
        },

        render() {
          self.appState = this.props.appState;
          self.setAppState = this.props.setAppState;
          return rawRender.apply(self, arguments);
        },
      });
      SetAppStateComponentWrapper.prototype = SetAppStateSubProto;
      this.__set_app_state.ComponentWrapper = SetAppStateComponentWrapper;

      this.shouldComponentUpdate = function(nextProps, nextState) {
        this.__set_app_state.prevProps = this.props;
        this.__set_app_state.nextProps = nextProps;
        this.__set_app_state.prevState = this.state;
        this.__set_app_state.nextState = nextState;
        return true;
      };
    }

    this.render = wrapMethod(rawRender, AppComponent.prototype.wrapRender);
  }

  wrapRender(render, args) {
    return <SetStateContext.Consumer>
      {setAppState => (
        <StateContext.Consumer>
          {appState => {
            if (this.__set_app_state.ComponentWrapper) {
              return <this.__set_app_state.ComponentWrapper
                appState={appState}
                setAppState={setAppState}
              />;
            }
            this.appState = appState;
            this.setAppState = setAppState;
            return render.apply(this, args);
          }}
        </StateContext.Consumer>
      )}
    </SetStateContext.Consumer>;
  }
}


const setAppStateRecursive = (path, i, subState, update) => {
  if (i === path.length) {
    return Object.assign({}, subState,
      (typeof update === 'function') ? update(subState) : update
    );
  }
  return Object.assign({}, setAppStateRecursive(
    path,
    i + 1,
    subState[path[i]],
    update
  ));
};

export class AppStateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.appState || {};
    this.setAppState = this.setAppState.bind(this);
  }

  render() {
    return <SetStateContext.Provider value={this.setAppState}>
      <StateContext.Provider value={this.state}>
        {this.props.children}
      </StateContext.Provider>
    </SetStateContext.Provider>
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
      state => setAppStateRecursive(path, 0, state, update),
      callback
    );
  }
}

export class RootComponent extends React.Component {
  constructor(props) {
    super(props);
    this.render = wrapMethod(this.render, RootComponent.prototype.wrapRender);
  }

  wrapRender(render, args) {
    return <AppStateContainer appState={this.appState}>
      {render.apply(this, args)}
    </AppStateContainer>;
  }
}

