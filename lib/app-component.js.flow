// @flow
import * as React from 'react';
import { DefaultAppStateContext } from './app-state-context';
import proxyLifecycleMethodsFor from './proxy-lifecycle-methods-for';
import type {
  GenericAppComponent,
  AppComponentProxyType,
  SetAppState,
  AppStateContext,
} from './types';

export default class AppComponent<Props, State, AppState: Object>
  extends React.Component<Props, State>
  implements GenericAppComponent<Props, State, AppState> {
  +__AppComponentProxy: AppComponentProxyType<Props, State, AppState>;

  +appStateContext: ?AppStateContext<AppState>;
  +render: () => React.Node;
  appState: AppState;
  setAppState: SetAppState<AppState>;

  constructor(props: Props) {
    super(props);

    this.__AppComponentProxy = proxyLifecycleMethodsFor(this);
    this.render = AppComponent.prototype.render;
  }

  render() {
    const context = this.appStateContext || DefaultAppStateContext;
    const AppComponentProxy = this.__AppComponentProxy;
    return (
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
    );
  }
}
