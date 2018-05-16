// @flow
import * as React from 'react';
import AppStateProvider from './app-state-provider';
import { DefaultAppStateContext } from './app-state-context';
import proxyLifecycleMethodsFor from './proxy-lifecycle-methods-for';
import type { GenericAppComponent, AppComponentProxyType, SetAppState, AppStateContext } from './types';

export default class RootAppComponent<Props, State, AppState: Object>
  extends React.Component<Props, State>
  implements GenericAppComponent<Props, State, AppState> {
  +__AppComponentProxy: AppComponentProxyType<Props, State, AppState>;

  static getDerivedAppState: ?(AppState) => $Shape<AppState>;

  +appStateContext: ?AppStateContext<AppState>;
  +render: () => React.Node;
  appState: AppState;
  setAppState: SetAppState<AppState>;

  constructor(props: Props) {
    super(props);

    this.__AppComponentProxy = proxyLifecycleMethodsFor(this);
    this.render = RootAppComponent.prototype.render;

    // This should usually be overwritten with a default value by derived class
    this.appState = ({}: any);
  }

  render() {
    const context = this.appStateContext || DefaultAppStateContext;
    const AppComponentProxy = this.__AppComponentProxy;
    return (
      <AppStateProvider
        context={context}
        appState={this.appState}
        getDerivedAppState={this.constructor.getDerivedAppState}
      >
        <context.Consumer>
          {({ appState, setAppState }) => (
            <AppComponentProxy
              props={this.props}
              state={this.state}
              appState={appState}
              setAppState={setAppState}
            />
          )}
        </context.Consumer>
      </AppStateProvider>
    );
  }
}
