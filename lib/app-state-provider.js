'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _appStateContext = require('./app-state-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getNewAppStateRecursive = function getNewAppStateRecursive(path, i, subState, update) {
  if (i === path.length) {
    return Object.assign({}, subState, typeof update === 'function' ? update(subState) : update);
  }
  var subPath = path[i];
  return Object.assign({}, subState[subPath], _defineProperty({}, subPath, getNewAppStateRecursive(path, i + 1, subState[subPath] || {}, update)));
};

var AppStateProvider = function (_React$Component) {
  _inherits(AppStateProvider, _React$Component);

  function AppStateProvider(props) {
    _classCallCheck(this, AppStateProvider);

    var _this = _possibleConstructorReturn(this, (AppStateProvider.__proto__ || Object.getPrototypeOf(AppStateProvider)).call(this, props));

    _this.state = _this.props.appState || {};
    if (props.getDerivedAppState) {
      _this.state = Object.assign({}, _this.state, props.getDerivedAppState(_this.state));
    }
    _this.setAppState = _this.setAppState.bind(_this);
    return _this;
  }

  _createClass(AppStateProvider, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        _appStateContext.DefaultAppStateContext.Provider,
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

  return AppStateProvider;
}(React.Component);

exports.default = AppStateProvider;