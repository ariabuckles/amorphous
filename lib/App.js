'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _logo = require('./logo.svg');

var _logo2 = _interopRequireDefault(_logo);

require('./App.css');

var _amorphous = require('./amorphous');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_AppComponent) {
  _inherits(Input, _AppComponent);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  _createClass(Input, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('input', {
        type: 'text',
        value: this.appState.text,
        onChange: function onChange(e) {
          return _this2.setAppState({ text: e.target.value });
        }
      });
    }
  }]);

  return Input;
}(_amorphous.AppComponent);

var Output = function (_AppComponent2) {
  _inherits(Output, _AppComponent2);

  function Output() {
    _classCallCheck(this, Output);

    return _possibleConstructorReturn(this, (Output.__proto__ || Object.getPrototypeOf(Output)).apply(this, arguments));
  }

  _createClass(Output, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState, nextAppState) {
      console.log('shouldComponentUpdate: prev: ', this.props, this.state, this.appState);
      console.log('shouldComponentUpdate: next: ', nextProps, nextState, nextAppState);
      console.log('---');
      return nextAppState.text !== this.appState.text;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        null,
        'You typed: ',
        this.appState.text
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState, snapshot, prevAppState) {
      console.log('componentDidUpdate: prev: ', prevProps, prevState, prevAppState);
      console.log('componentDidUpdate: next: ', this.props, this.state, this.appState);
    }
  }]);

  return Output;
}(_amorphous.AppComponent);

var App = function (_RootAppComponent) {
  _inherits(App, _RootAppComponent);

  function App(props) {
    _classCallCheck(this, App);

    var _this4 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this4.appState = { text: 'hi' };
    return _this4;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'App' },
        _react2.default.createElement(Input, { iProp: 'i' }),
        _react2.default.createElement(Output, { oProp: 'o' })
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState, snapshot, prevAppState) {
      console.log('ROOT componentDidUpdate: prev: ', prevProps, prevState, prevAppState);
      console.log('ROOT componentDidUpdate: next: ', this.props, this.state, this.appState);
    }
  }]);

  return App;
}(_amorphous.RootAppComponent);

exports.default = App;