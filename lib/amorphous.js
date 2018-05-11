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

var AppStateContext = React.createContext({
  appState: {},
  setAppState: function setAppState() {
    throw new Error('Amorphous: to use appState, You must provide a RootAppComponent at the ' + 'root of your app/library component tree');
  }
});

var AppStateContainer = exports.AppStateContainer = function (_React$Component) {
  _inherits(AppStateContainer, _React$Component);

  function AppStateContainer(props) {
    _classCallCheck(this, AppStateContainer);

    var _this = _possibleConstructorReturn(this, (AppStateContainer.__proto__ || Object.getPrototypeOf(AppStateContainer)).call(this, props));

    _this.state = _this.props.appState || {};
    if (props.getDerivedAppState) {
      _this.state = Object.assign({}, _this.state, props.getDerivedAppState(_this.state));
    }
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
      var _this2 = this;

      var path = [];
      var i = 0;
      while (i < arguments.length && typeof (arguments.length <= i ? undefined : arguments[i]) === 'string') {
        path.push(arguments.length <= i ? undefined : arguments[i]);
        i++;
      }
      var update = arguments.length <= i ? undefined : arguments[i];
      var callback = arguments.length <= i + 1 ? undefined : arguments[i + 1];
      this.setState(function (state) {
        var newState = getNewAppStateRecursive(path, 0, state, update);
        if (_this2.props.getDerivedAppState) {
          // Mutating is okay because newState is ensured to be a new object
          Object.assign(newState, _this2.props.getDerivedAppState(newState));
        }
        return newState;
      }, callback);
    }
  }]);

  return AppStateContainer;
}(React.Component);

var AppComponent = function (_React$Component2) {
  _inherits(AppComponent, _React$Component2);

  function AppComponent(props) {
    _classCallCheck(this, AppComponent);

    var _this3 = _possibleConstructorReturn(this, (AppComponent.__proto__ || Object.getPrototypeOf(AppComponent)).call(this, props));

    _this3.__AppComponentProxy = (0, _proxyLifecycleMethodsFor2.default)(_this3);
    _this3.render = AppComponent.prototype.render;
    return _this3;
  }

  _createClass(AppComponent, [{
    key: 'render',
    value: function render(_render, args) {
      var _this4 = this;

      return React.createElement(
        AppStateContext.Consumer,
        null,
        function (_ref) {
          var appState = _ref.appState,
              setAppState = _ref.setAppState;
          return React.createElement(_this4.__AppComponentProxy, {
            props: _this4.props,
            state: _this4.state,
            appState: appState,
            setAppState: setAppState
          });
        }
      );
    }
  }]);

  return AppComponent;
}(React.Component);

exports.AppComponent = AppComponent;

var RootAppComponent = function (_React$Component3) {
  _inherits(RootAppComponent, _React$Component3);

  function RootAppComponent(props) {
    _classCallCheck(this, RootAppComponent);

    var _this5 = _possibleConstructorReturn(this, (RootAppComponent.__proto__ || Object.getPrototypeOf(RootAppComponent)).call(this, props));

    _this5.__AppComponentProxy = (0, _proxyLifecycleMethodsFor2.default)(_this5);
    _this5.render = RootAppComponent.prototype.render;

    // This should usually be overwritten with a default value by derived class
    _this5.appState = {};
    return _this5;
  }

  _createClass(RootAppComponent, [{
    key: 'render',
    value: function render(_render2, args) {
      var _this6 = this;

      return React.createElement(
        AppStateContainer,
        {
          appState: this.appState,
          getDerivedAppState: this.constructor.getDerivedAppState
        },
        React.createElement(
          AppStateContext.Consumer,
          null,
          function (_ref2) {
            var appState = _ref2.appState,
                setAppState = _ref2.setAppState;
            return React.createElement(_this6.__AppComponentProxy, {
              props: _this6.props,
              state: _this6.state,
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

exports.RootAppComponent = RootAppComponent;