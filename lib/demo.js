'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _amorphous = require('./amorphous');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyAppStateContext = (0, _amorphous.createAppStateContext)();

var MyAppComponent = function (_AppComponent) {
  _inherits(MyAppComponent, _AppComponent);

  function MyAppComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MyAppComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyAppComponent.__proto__ || Object.getPrototypeOf(MyAppComponent)).call.apply(_ref, [this].concat(args))), _this), _this.appStateContext = MyAppStateContext, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return MyAppComponent;
}(_amorphous.AppComponent);

var MyRootAppComponent = function (_RootAppComponent) {
  _inherits(MyRootAppComponent, _RootAppComponent);

  function MyRootAppComponent() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, MyRootAppComponent);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = MyRootAppComponent.__proto__ || Object.getPrototypeOf(MyRootAppComponent)).call.apply(_ref2, [this].concat(args))), _this2), _this2.appStateContext = MyAppStateContext, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  return MyRootAppComponent;
}(_amorphous.RootAppComponent);

var Input = function (_MyAppComponent) {
  _inherits(Input, _MyAppComponent);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  _createClass(Input, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      return React.createElement('input', {
        type: 'text',
        value: this.appState.text || 'null',
        onChange: function onChange(e) {
          return _this4.setAppState({ text: e.target.value });
        }
      });
    }
  }]);

  return Input;
}(MyAppComponent);

var Output = function (_MyAppComponent2) {
  _inherits(Output, _MyAppComponent2);

  function Output() {
    _classCallCheck(this, Output);

    return _possibleConstructorReturn(this, (Output.__proto__ || Object.getPrototypeOf(Output)).apply(this, arguments));
  }

  _createClass(Output, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        null,
        'You typed: ',
        this.appState.text
      );
    }
  }]);

  return Output;
}(MyAppComponent);

var App = function (_MyRootAppComponent) {
  _inherits(App, _MyRootAppComponent);

  function App() {
    var _ref3;

    var _temp3, _this6, _ret3;

    _classCallCheck(this, App);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this6 = _possibleConstructorReturn(this, (_ref3 = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref3, [this].concat(args))), _this6), _this6.appState = { text: 'hi' }, _temp3), _possibleConstructorReturn(_this6, _ret3);
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Input, null),
        React.createElement(Output, null)
      );
    }
  }]);

  return App;
}(MyRootAppComponent);

exports.default = App;