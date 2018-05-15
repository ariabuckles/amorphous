'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mocha = require('mocha');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _amorphous = require('../amorphous');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// TODO: import { strict as assert } from 'assert'; once flow supports strict assert


(0, _mocha.describe)('setAppState', function () {
  var AccessRoot = function (_RootAppComponent) {
    _inherits(AccessRoot, _RootAppComponent);

    function AccessRoot() {
      _classCallCheck(this, AccessRoot);

      return _possibleConstructorReturn(this, (AccessRoot.__proto__ || Object.getPrototypeOf(AccessRoot)).apply(this, arguments));
    }

    _createClass(AccessRoot, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(
          'button',
          {
            type: 'button',
            onClick: function onClick() {
              return _this2.setAppState('button', function (s) {
                return { count: (s.count || 0) + 1 };
              });
            }
          },
          this.appState.button && this.appState.button.count ? this.appState.button.count : 0
        );
      }
    }]);

    return AccessRoot;
  }(_amorphous.RootAppComponent);

  (0, _mocha.it)('can set and read path-specified appState', function () {
    var test = _reactTestRenderer2.default.create(_react2.default.createElement(AccessRoot, null));
    _assert2.default.deepEqual(test.toJSON().children, ['0']);
    var button = test.root.findByType('button');
    button.props.onClick();
    _assert2.default.deepEqual(test.toJSON().children, ['1']);
  });
});