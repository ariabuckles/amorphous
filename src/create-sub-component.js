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
      const props = this.props;
      this.props = props.props;
      this.state = props.state;
      this.appState = props.appState;

      const props = self.props;
      const state = self.state;
      const appState = self.appState;

      self.props = this.props.props;
      self.state = this.props.state;
      //self.appState = this.props.appState; //TODO unnecessary due to updated?

      const result = shouldComponentUpdate.call(
        this,
        nextProps.props,
        nextProps.state,
        nextProps.appState
      );

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
      return componentDidMount.apply(self, arguments);
    },

    getSnapshotBeforeUpdate() {
      self.appState = this.props.appState;
      self.setAppState = this.props.setAppState;
      return getSnapshotBeforeUpdate.apply(self, arguments);
    },

    componentDidUpdate(prevProps, prevState, snapshot) {
      const props = self.props;
      const state = self.state;

      self.props = this.props.props;
      self.state = this.props.state;
      //self.appState = this.props.appState; //TODO unnecessary due to updated?

      const result = componentDidUpdate.call(
        self,
        prevProps.props,
        prevProps.state,
        snapshot,
        prevProps.appState
      );

      self.props = props;
      self.state = state;
      // self.appState = appState; //TODO similarly not necessary i think
      return result;
    },

  });

  SetAppStateComponentWrapper.prototype = SetAppStateSubProto;

  return SetAppStateComponentWrapper;
};

export default createSubComponent;
