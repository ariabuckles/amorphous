// @flow
import * as React from 'react';
import AppStateContext from './app-state-context';
import proxyLifecycleMethodsFor from './proxy-lifecycle-methods-for';
import type { GenericAppComponent, SetAppState } from './types';

export default class AppComponent<Props, State, AppState: Object>
  extends React.Component<Props, State>
  implements GenericAppComponent<Props, State, AppState> {
  static getDerivedAppState: (AppState) => $Shape<AppState>;

  +render: () => React.Node;
  appState: AppState;
  setAppState: SetAppState<AppState>;

  +__AppComponentProxy: React.ComponentType<{
    props: Props,
    state: State,
    appState: AppState,
    setAppState: SetAppState<AppState>,
  }>;

  constructor(props: Props) {
    super(props);

    this.__AppComponentProxy = proxyLifecycleMethodsFor(this);
    this.render = AppComponent.prototype.render;
  }

  render() {
    const AppComponentProxy = this.__AppComponentProxy;
    return (
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
    );
  }
}
