// @flow
import * as React from 'react';
import type { GenericAppComponent } from './types';

// From https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
const getDisplayName = (WrappedComponent: Function) => {
  return (
    (WrappedComponent: Object).displayName ||
    WrappedComponent.name ||
    'Component'
  );
};

const stubMethods = {
  shouldComponentUpdate() {
    return true;
  },
  render() {
    throw new Error('render should be replaced with a wrapped render');
  },
  // componentDidMount requires no proxying
  getSnapshotBeforeUpdate() {
    return null;
  },
  componentDidUpdate() {},
  // componentWillUnmount requires no proxying
  // componentDidCatch requires no proxying
};

const proxyLifecycleMethodsFor = <Props, State, AppState: Object>(
  self: GenericAppComponent<Props, State, AppState>
) => {
  let original = {};

  // AppComponentProxy method definitions
  const proxyMethods = {
    shouldComponentUpdate(nextProps) {
      const props = self.props;
      const state = self.state;
      const appState = self.appState;

      try {
        self.props = this.props.props;
        self.state = this.props.state;
        self.appState = this.props.appState;
        return original.shouldComponentUpdate.call(
          self,
          nextProps.props,
          nextProps.state,
          nextProps.appState
        );
      } finally {
        self.props = props;
        self.state = state;
        self.appState = appState;
      }
    },

    render() {
      self.appState = this.props.appState;
      self.setAppState = this.props.setAppState;
      return original.render.apply(self, arguments);
    },

    // We need this to be on the proxy, so that it is triggered immediately
    // before componentDidUpdate, so we have it here
    getSnapshotBeforeUpdate() {
      return original.getSnapshotBeforeUpdate.apply(self, arguments);
    },

    componentDidUpdate(prevProps, prevState, snapshot) {
      return original.componentDidUpdate.call(
        self,
        prevProps.props,
        prevProps.state,
        snapshot,
        prevProps.appState
      );
    },
  };

  // AppComponentProxy class
  type ProxyProps = {
    props: Props,
    state: State,
    appState: AppState,
    setAppState: (
      update: $Shape<AppState> | ((appState: AppState) => $Shape<AppState>),
      cb: () => void
    ) => void,
  };
  class AppComponentProxy<ProxyProps> extends React.Component<ProxyProps> {}
  (AppComponentProxy: Object).displayName = `AppComponentProxy(${getDisplayName(
    self.constructor
  )})`;

  // Move methods from `self` to AppComponentProxy (and create `original` obj)
  for (const method in proxyMethods) {
    if ((self: Object)[method]) {
      // Create `original` object
      original[method] = (self: Object)[method];
      // Proxy method calls on proxy component to the instance (self) component
      (AppComponentProxy: Function).prototype[method] = proxyMethods[method];
      // Take proxied methods off `self` (as far as react sees)
      (self: Object)[method] = stubMethods[method];
    }
  }

  return AppComponentProxy;
};

export default proxyLifecycleMethodsFor;
