'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// From https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
var getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

var stubMethods = {
  shouldComponentUpdate: function shouldComponentUpdate() {
    return true;
  },
  render: function render() {
    // This should never be called
    /* istanbul ignore next */
    throw new Error('Amorphous internal error: render should be replaced with a wrapped render');
  },

  // componentDidMount requires no proxying
  getSnapshotBeforeUpdate: function getSnapshotBeforeUpdate() {
    return null;
  },
  componentDidUpdate: function componentDidUpdate() {}
};

var proxyLifecycleMethodsFor = function proxyLifecycleMethodsFor(self) {
  var original = {};

  // AppComponentProxy method definitions
  var proxyMethods = {
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      var props = self.props;
      var state = self.state;
      var appState = self.appState;

      try {
        self.props = this.props.props;
        self.state = this.props.state;
        self.appState = this.props.appState;
        return original.shouldComponentUpdate.call(self, nextProps.props, nextProps.state, nextProps.appState);
      } finally {
        self.props = props;
        self.state = state;
        self.appState = appState;
      }
    },
    render: function render() {
      self.appState = this.props.appState;
      self.setAppState = this.props.setAppState;
      return original.render.apply(self, arguments);
    },


    // We need this to be on the proxy, so that it is triggered immediately
    // before componentDidUpdate, so we have it here
    getSnapshotBeforeUpdate: function getSnapshotBeforeUpdate() {
      return original.getSnapshotBeforeUpdate.apply(self, arguments);
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState, snapshot) {
      return original.componentDidUpdate.call(self, prevProps.props, prevProps.state, snapshot, prevProps.appState);
    }
  };

  /*:: // eslint thinks this is an unused var :/
  type ProxyProps = {
    props: Props,
    state: State,
    appState: AppState,
    setAppState: SetAppState<AppState>,
  };
  */

  var AppComponentProxy = function (_React$Component) {
    _inherits(AppComponentProxy, _React$Component);

    function AppComponentProxy() {
      _classCallCheck(this, AppComponentProxy);

      return _possibleConstructorReturn(this, (AppComponentProxy.__proto__ || Object.getPrototypeOf(AppComponentProxy)).apply(this, arguments));
    }

    return AppComponentProxy;
  }(React.Component);

  AppComponentProxy.displayName = 'AppComponentProxy(' + getDisplayName(self.constructor) + ')';

  // Move methods from `self` to AppComponentProxy (and create `original` obj)
  for (var method in proxyMethods) {
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

exports.default = proxyLifecycleMethodsFor;