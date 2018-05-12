import * as React from 'react';
import AppStateProvider from './app-state-provider';
import AppStateContext from './app-state-context';
import proxyLifecycleMethodsFor from './proxy-lifecycle-methods-for';

export default class RootAppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.__AppComponentProxy = proxyLifecycleMethodsFor(this);
    this.render = RootAppComponent.prototype.render;

    // This should usually be overwritten with a default value by derived class
    this.appState = {};
  }

  render(render, args) {
    return (
      <AppStateProvider
        appState={this.appState}
        getDerivedAppState={this.constructor.getDerivedAppState}
      >
        <AppStateContext.Consumer>
          {({ appState, setAppState }) => (
            <this.__AppComponentProxy
              props={this.props}
              state={this.state}
              appState={appState}
              setAppState={setAppState}
            />
          )}
        </AppStateContext.Consumer>
      </AppStateProvider>
    );
  }
}
