import * as React from 'react';

const createSubComponent = (self) => {
  const shouldComponentUpdate = self.shouldComponentUpdate;
  const render = self.render;
  const componentDidMount = self.componentDidMount;
  const getSnapshotBeforeUpdate = self.getSnapshotBeforeUpdate;
  const componentDidUpdate = self.componentDidUpdate;

  const SetAppStateComponentWrapper = function(props) {
    React.Component.apply(this, props);
  };
  const SetAppStateSubProto = Object.create(self);

  Object.assign(SetAppStateSubProto, {
    shouldComponentUpdate(nextProps) {
      const props = self.props;
      const state = self.state;
      const appState = self.appState;

      try {
        self.props = this.props.props;
        self.state = this.props.state;
        self.appState = this.props.appState;
        return shouldComponentUpdate ? shouldComponentUpdate.call(
          self,
          nextProps.props,
          nextProps.state,
          nextProps.appState
        ) : true;
      } finally {
        self.props = props;
        self.state = props;
        self.appState = appState;
      }
    },

    render() {
      self.appState = this.props.appState;
      return render.apply(self, arguments);
    },

    componentDidMount() {
      self.setAppState = this.props.setAppState;
      return componentDidMount && componentDidMount.apply(self, arguments);
    },

    getSnapshotBeforeUpdate() {
      self.appState = this.props.appState;
      self.setAppState = this.props.setAppState;
      return getSnapshotBeforeUpdate ?
        getSnapshotBeforeUpdate.apply(self, arguments)
      : null;
    },

    componentDidUpdate(prevProps, prevState, snapshot) {
      return componentDidUpdate && componentDidUpdate.call(
        self,
        prevProps.props,
        prevProps.state,
        snapshot,
        prevProps.appState
      );
    },

  });

  SetAppStateComponentWrapper.prototype = SetAppStateSubProto;

  return SetAppStateComponentWrapper;
};

export default createSubComponent;
