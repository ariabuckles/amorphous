import * as React from 'react';
import AppStateContext from './app-state-context';
import proxyLifecycleMethodsFor from './proxy-lifecycle-methods-for';

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.__AppComponentProxy = proxyLifecycleMethodsFor(this);
    this.render = AppComponent.prototype.render;
  }

  render(render, args) {
    return (
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
    );
  }
}
