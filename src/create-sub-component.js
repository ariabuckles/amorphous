import * as React from 'react';

const createSubComponent = (self) => {
  const shouldComponentUpdate = self.shouldComponentUpdate;
  const render = self.render;
  const componentDidMount = self.componentDidMount;
  const getSnapshotBeforeUpdate = self.getSnapshotBeforeUpdate;
  const componentDidUpdate = self.componentDidUpdate;

  const SetAppStateComponentWrapper = function(props) {
    React.Component.apply(this, props);
    this.state = null;
  };
  const SetAppStateSubProto = Object.create(self);

  Object.assign(SetAppStateSubProto, {
    shouldComponentUpdate(nextProps) {
      const props = this.props;
      this.props = props.props;
      this.state = props.state;
      this.appState = props.appState;

      const result = shouldComponentUpdate ? shouldComponentUpdate.call(
        this,
        nextProps.props,
        nextProps.state,
        nextProps.appState
      ) : true;

      this.props = props;
      this.state = null;
      delete this.appState; // send back to the prototype chain
      return result;
    },

    render() {
      self.appState = this.props.appState;
      self.setAppState = this.props.setAppState;
      return render.apply(self, arguments);
    },

    componentDidMount() {
      self.appState = this.props.appState;
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
      const result = componentDidUpdate && componentDidUpdate.call(
        self,
        prevProps.props,
        prevProps.state,
        snapshot,
        prevProps.appState
      );
      return result;
    },

  });

  SetAppStateComponentWrapper.prototype = SetAppStateSubProto;

  return SetAppStateComponentWrapper;
};

export default createSubComponent;
