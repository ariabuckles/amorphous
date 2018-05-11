import * as React from 'react';

// From https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const stubMethods = {
  shouldComponentUpdate() { return true; },
  render() { throw new Error("render should be replaced with a wrapped render"); },
  componentDidMount() { },
  getSnapshotBeforeUpdate() { return null; },
  componentDidUpdate() { },
  // componentWillUnmount requires no proxying
  // componentDidCatch requires no proxying
};

const proxyLifecycleMethodsFor = (self) => {
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

    // TODO: do we need this? or is letting the wrapper mount enough?
    componentDidMount() {
      return original.componentDidMount.apply(self, arguments);
    },

    // We need this to be on the proxy, so we have it here
    getSnapshotBeforeUpdate() {
      // Do we need to update appState/setAppState here? I think we don't...
      self.appState = this.props.appState;
      self.setAppState = this.props.setAppState;
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
  const AppComponentProxy = function(props) {
    React.Component.apply(this, props);
  };
  AppComponentProxy.prototype = Object.create(React.Component.prototype);
  AppComponentProxy.displayName = `AppComponentProxy(${getDisplayName(self.constructor)})`;

  // Move methods from `self` to AppComponentProxy (and create `original` obj)
  for (const method in proxyMethods) {
    if (self[method]) {
      // Create `original` object
      original[method] = self[method];
      // Proxy method calls on proxy component to the instance (self) component
      AppComponentProxy.prototype[method] = proxyMethods[method];
      // Take proxied methods off `self` (as far as react sees)
      self[method] = stubMethods[method];
    }
  }

  return AppComponentProxy;
};

export default proxyLifecycleMethodsFor;
