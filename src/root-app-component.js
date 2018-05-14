// @flow
import * as React from 'react';
import AppStateProvider from './app-state-provider';
import AppStateContext from './app-state-context';
import proxyLifecycleMethodsFor from './proxy-lifecycle-methods-for';
import type { GenericAppComponent, SetAppState } from './types';

export default class RootAppComponent<Props, State, AppState : Object>
  extends React.Component<Props, State>
  implements GenericAppComponent<Props, State, AppState>
{
  static getDerivedAppState: (AppState) => $Shape<AppState>;
  render: () => React.Node;
  appState: AppState;
  setAppState: SetAppState<AppState>;

  __AppComponentProxy: React.ComponentType<{
    props: Props,
    state: State,
    appState: AppState,
    setAppState: SetAppState<AppState>,
  }>;

  constructor(props: Props) {
    super(props);

    this.__AppComponentProxy = proxyLifecycleMethodsFor(this);
    this.render = RootAppComponent.prototype.render;

    // This should usually be overwritten with a default value by derived class
    this.appState = ({} : any);
  }

  render() {
    const AppComponentProxy = this.__AppComponentProxy;
    return (
      <AppStateProvider
        appState={this.appState}
        getDerivedAppState={this.constructor.getDerivedAppState}
      >
        <AppStateContext.Consumer>
          {({ appState, setAppState }) => (
            <AppComponentProxy
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
