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


// Disable react error boundary warnings for throws blocks
var assertThrows = function assertThrows(block) {
  var consoleError = console.error;
  console.error = function () {};

  _assert2.default.throws(function () {
    block();
  });

  console.error = consoleError;
};

(0, _mocha.describe)('Error Messages for the following situations', function () {
  (0, _mocha.describe)('rendering an AppComponent with no RootAppComponent', function () {

    (0, _mocha.it)('this.appState should error', function () {
      var Comp = function (_AppComponent) {
        _inherits(Comp, _AppComponent);

        function Comp() {
          _classCallCheck(this, Comp);

          return _possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
        }

        _createClass(Comp, [{
          key: 'render',
          value: function render() {
            return React.createElement(
              'span',
              null,
              this.appState.count || 0
            );
          }
        }]);

        return Comp;
      }(_amorphous.AppComponent);

      assertThrows(function () {
        _reactTestRenderer2.default.create(React.createElement(Comp, null));
      });
    });

    (0, _mocha.it)('this.setAppState should error', function () {
      var Comp = function (_AppComponent2) {
        _inherits(Comp, _AppComponent2);

        function Comp() {
          _classCallCheck(this, Comp);

          return _possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
        }

        _createClass(Comp, [{
          key: 'render',
          value: function render() {
            var _this3 = this;

            return React.createElement(
              'button',
              {
                type: 'button',
                onClick: function onClick() {
                  return _this3.setAppState(function (s) {
                    return { count: (s.count || 0) + 1 };
                  });
                }
              },
              '"click me"'
            );
          }
        }]);

        return Comp;
      }(_amorphous.AppComponent);

      assertThrows(function () {
        _reactTestRenderer2.default.create(React.createElement(Comp, null));
      });
    });

    (0, _mocha.it)('AppComponent should error without any appState access', function () {
      var Comp = function (_AppComponent3) {
        _inherits(Comp, _AppComponent3);

        function Comp() {
          _classCallCheck(this, Comp);

          return _possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
        }

        _createClass(Comp, [{
          key: 'render',
          value: function render() {
            return React.createElement(
              'span',
              null,
              'hi!'
            );
          }
        }]);

        return Comp;
      }(_amorphous.AppComponent);

      assertThrows(function () {
        _reactTestRenderer2.default.create(React.createElement(Comp, null));
      });
    });

    (0, _mocha.it)('DefaultAppStateContext should error on setAppState access', function () {
      var Comp = function (_React$Component) {
        _inherits(Comp, _React$Component);

        function Comp() {
          _classCallCheck(this, Comp);

          return _possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
        }

        _createClass(Comp, [{
          key: 'render',
          value: function render() {
            return React.createElement(
              _amorphous.DefaultAppStateContext.Consumer,
              null,
              function (contextValue) {
                return React.createElement(
                  'span',
                  null,
                  contextValue.appState
                );
              }
            );
          }
        }]);

        return Comp;
      }(React.Component);

      assertThrows(function () {
        _reactTestRenderer2.default.create(React.createElement(Comp, null));
      });
    });

    (0, _mocha.it)('DefaultAppStateContext should error on appState access', function () {
      var Comp = function (_React$Component2) {
        _inherits(Comp, _React$Component2);

        function Comp() {
          _classCallCheck(this, Comp);

          return _possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
        }

        _createClass(Comp, [{
          key: 'render',
          value: function render() {
            return React.createElement(
              _amorphous.DefaultAppStateContext.Consumer,
              null,
              function (contextValue) {
                var setAppState = contextValue.setAppState;
                return React.createElement('input', {
                  type: 'button',
                  value: 'click',
                  onClick: function onClick() {
                    return setAppState({ clicked: true });
                  }
                });
              }
            );
          }
        }]);

        return Comp;
      }(React.Component);

      assertThrows(function () {
        _reactTestRenderer2.default.create(React.createElement(Comp, null));
      });
    });
  });
});