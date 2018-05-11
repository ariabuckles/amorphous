'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootAppComponent = exports.AppComponent = exports.AppStateContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _proxyLifecycleMethodsFor = require('./proxy-lifecycle-methods-for');

var _proxyLifecycleMethodsFor2 = _interopRequireDefault(_proxyLifecycleMethodsFor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getNewAppStateRecursive = function getNewAppStateRecursive(path, i, subState, update) {
  if (i === path.length) {
    return Object.assign({}, subState, typeof update === 'function' ? update(subState) : update);
  }
  return Object.assign({}, getNewAppStateRecursive(path, i + 1, subState[path[i]], update));
};

var setNewAppState = function setNewAppState(setState, context, args) {
  var path = [];
  var i = 0;
  while (i < args.length && typeof args[i] === 'string') {
    path.push(args[i]);
    i++;
  }
  var update = args[i];
  var callback = args[i + 1];
  setState.call(context, function (state) {
    return getNewAppStateRecursive(path, 0, state, update);
  }, callback);
};

var AppStateContext = React.createContext({
  appState: {},
  setAppState: function setAppState() {
    throw new Error('Amorphous: to use appState, You must provide a RootAppComponent at the ' + 'root of your app/library component tree');
  }
});

var wrapMethod = function wrapMethod(lifeCycleMethod, methodWrapper) {
  if (typeof lifeCycleMethod !== 'function') {
    return lifeCycleMethod;
  }

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return methodWrapper.call(this, lifeCycleMethod, args);
  };
};

var AppStateContainer = exports.AppStateContainer = function (_React$Component) {
  _inherits(AppStateContainer, _React$Component);

  function AppStateContainer(props) {
    _classCallCheck(this, AppStateContainer);

    var _this = _possibleConstructorReturn(this, (AppStateContainer.__proto__ || Object.getPrototypeOf(AppStateContainer)).call(this, props));

    _this.state = _this.props.appState || {};
    _this.setAppState = _this.setAppState.bind(_this);
    return _this;
  }

  _createClass(AppStateContainer, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        AppStateContext.Provider,
        {
          value: { appState: this.state, setAppState: this.setAppState }
        },
        this.props.children
      );
    }
  }, {
    key: 'setAppState',
    value: function setAppState() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      setNewAppState(this.setState, this, args);
    }
  }]);

  return AppStateContainer;
}(React.Component);

var AppComponent = exports.AppComponent = function (_React$Component2) {
  _inherits(AppComponent, _React$Component2);

  function AppComponent(props) {
    _classCallCheck(this, AppComponent);

    var _this2 = _possibleConstructorReturn(this, (AppComponent.__proto__ || Object.getPrototypeOf(AppComponent)).call(this, props));

    var rawRender = _this2.render;

    _this2.__AppComponentProxy = (0, _proxyLifecycleMethodsFor2.default)(_this2);
    // This *must* be rawrender, as proxyLifecycleMethodsFor modifies `this`:
    _this2.render = wrapMethod(rawRender, AppComponent.prototype.wrapRender);
    return _this2;
  }

  // Todo just replace render entirely


  _createClass(AppComponent, [{
    key: 'wrapRender',
    value: function wrapRender(render, args) {
      var _this3 = this;

      return React.createElement(
        AppStateContext.Consumer,
        null,
        function (_ref) {
          var appState = _ref.appState,
              setAppState = _ref.setAppState;
          return React.createElement(_this3.__AppComponentProxy, {
            props: _this3.props,
            state: _this3.state,
            appState: appState,
            setAppState: setAppState
          });
        }
      );
    }
  }]);

  return AppComponent;
}(React.Component);

var RootAppComponent = exports.RootAppComponent = function (_React$Component3) {
  _inherits(RootAppComponent, _React$Component3);

  function RootAppComponent(props) {
    _classCallCheck(this, RootAppComponent);

    var _this4 = _possibleConstructorReturn(this, (RootAppComponent.__proto__ || Object.getPrototypeOf(RootAppComponent)).call(this, props));

    var rawRender = _this4.render;

    _this4.__AppComponentProxy = (0, _proxyLifecycleMethodsFor2.default)(_this4);
    // This *must* be rawrender, as proxyLifecycleMethodsFor modifies `this`:
    _this4.render = wrapMethod(rawRender, RootAppComponent.prototype.wrapRender);

    // This should usually be overwritten with a default value by derived class
    _this4.appState = {};
    return _this4;
  }

  // Todo just replace render entirely


  _createClass(RootAppComponent, [{
    key: 'wrapRender',
    value: function wrapRender(render, args) {
      var _this5 = this;

      return React.createElement(
        AppStateContainer,
        { appState: this.appState },
        React.createElement(
          AppStateContext.Consumer,
          null,
          function (_ref2) {
            var appState = _ref2.appState,
                setAppState = _ref2.setAppState;
            return React.createElement(_this5.__AppComponentProxy, {
              props: _this5.props,
              state: _this5.state,
              appState: appState,
              setAppState: setAppState
            });
          }
        )
      );
    }
  }]);

  return RootAppComponent;
}(React.Component);