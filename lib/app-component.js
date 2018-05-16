'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _appStateContext = require('./app-state-context');

var _proxyLifecycleMethodsFor = require('./proxy-lifecycle-methods-for');

var _proxyLifecycleMethodsFor2 = _interopRequireDefault(_proxyLifecycleMethodsFor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppComponent = function (_React$Component) {
  _inherits(AppComponent, _React$Component);

  function AppComponent(props) {
    _classCallCheck(this, AppComponent);

    var _this = _possibleConstructorReturn(this, (AppComponent.__proto__ || Object.getPrototypeOf(AppComponent)).call(this, props));

    _this.__AppComponentProxy = (0, _proxyLifecycleMethodsFor2.default)(_this);
    _this.render = AppComponent.prototype.render;
    return _this;
  }

  _createClass(AppComponent, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var context = this.appStateContext || _appStateContext.DefaultAppStateContext;
      var AppComponentProxy = this.__AppComponentProxy;
      return React.createElement(
        context.Consumer,
        null,
        function (_ref) {
          var appState = _ref.appState,
              setAppState = _ref.setAppState;
          return React.createElement(AppComponentProxy, {
            props: _this2.props,
            state: _this2.state,
            appState: appState,
            setAppState: setAppState
          });
        }
      );
    }
  }]);

  return AppComponent;
}(React.Component);

exports.default = AppComponent;