'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mocha = require('mocha');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _amorphous = require('../amorphous');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// TODO: import { strict as assert } from 'assert'; once flow supports strict assert


(0, _mocha.describe)('Two AppComponent system', function () {
  var Input = function (_AppComponent) {
    _inherits(Input, _AppComponent);

    function Input() {
      _classCallCheck(this, Input);

      return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
    }

    _createClass(Input, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState, nextAppState) {
        return nextAppState.text !== this.appState.text;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return React.createElement('input', {
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
        return nextAppState.length !== this.appState.length;
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(
          'span',
          null,
          this.appState.length
        );
      }
    }]);

    return Output;
  }(_amorphous.AppComponent);

  var System = function (_RootAppComponent) {
    _inherits(System, _RootAppComponent);

    function System(props) {
      _classCallCheck(this, System);

      var _this4 = _possibleConstructorReturn(this, (System.__proto__ || Object.getPrototypeOf(System)).call(this, props));

      _this4.appState = { text: 'hi', length: 0 };
      return _this4;
    }

    _createClass(System, [{
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

    return System;
  }(_amorphous.RootAppComponent);

  System.getDerivedAppState = function (appState) {
    return {
      length: appState.text.length
    };
  };

  (0, _mocha.describe)('initialization and rendering', function () {
    (0, _mocha.it)('should render an input and a button', function () {
      var test = _reactTestRenderer2.default.create(React.createElement(System, null));
      _assert2.default.deepEqual(test.toJSON().children.map(function (child) {
        return child.type;
      }), ['input', 'span']);
    });

    (0, _mocha.it)('should render an input with the correct initialized value', function () {
      var test = _reactTestRenderer2.default.create(React.createElement(System, null));
      var input = test.root.findByType('input');
      _assert2.default.deepEqual(input.props.value, 'hi');
    });

    (0, _mocha.it)('should render a span with the correct derived value', function () {
      var test = _reactTestRenderer2.default.create(React.createElement(System, null));
      var span = test.root.findByType('span');
      _assert2.default.deepEqual(span.children, ['2']);
    });

    (0, _mocha.it)('should render all correct values and derived values', function () {
      var test = _reactTestRenderer2.default.create(React.createElement(System, null));
      // get rid of functions:
      _assert2.default.deepEqual(JSON.parse(JSON.stringify(test.toJSON())), {
        type: 'div',
        props: {},
        children: [{
          type: 'input',
          props: {
            type: 'text',
            value: 'hi'
          },
          children: null
        }, {
          type: 'span',
          props: {},
          children: ['2']
        }]
      });
    });
  });

  (0, _mocha.describe)('cross-component interactions', function () {
    (0, _mocha.it)('should send a letter from the input to the output', function () {
      var test = _reactTestRenderer2.default.create(React.createElement(System, null));
      var input = test.root.findByType('input');
      var span = test.root.findByType('span');
      input.props.onChange({ target: { value: 'hi!' } });
      _assert2.default.deepEqual(input.props.value, 'hi!');
      _assert2.default.deepEqual(span.children, ['3']);
    });
  });
});