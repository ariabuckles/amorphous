'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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


(0, _mocha.describe)('Single AppComponent', function () {
  (0, _mocha.describe)('appState access', function () {
    var AccessApp = function (_AppComponent) {
      _inherits(AccessApp, _AppComponent);

      function AccessApp() {
        _classCallCheck(this, AccessApp);

        return _possibleConstructorReturn(this, (AccessApp.__proto__ || Object.getPrototypeOf(AccessApp)).apply(this, arguments));
      }

      _createClass(AccessApp, [{
        key: 'render',
        value: function render() {
          var _this2 = this;

          return React.createElement(
            'button',
            {
              type: 'button',
              onClick: function onClick() {
                return _this2.setAppState(function (s) {
                  return { count: (s.count || 0) + 1 };
                });
              }
            },
            this.appState.count || 0
          );
        }
      }]);

      return AccessApp;
    }(_amorphous.AppComponent);

    var AccessRoot = function (_RootAppComponent) {
      _inherits(AccessRoot, _RootAppComponent);

      function AccessRoot() {
        _classCallCheck(this, AccessRoot);

        return _possibleConstructorReturn(this, (AccessRoot.__proto__ || Object.getPrototypeOf(AccessRoot)).apply(this, arguments));
      }

      _createClass(AccessRoot, [{
        key: 'render',
        value: function render() {
          return React.createElement(AccessApp, null);
        }
      }]);

      return AccessRoot;
    }(_amorphous.RootAppComponent);

    (0, _mocha.it)('can set and retrieve appState', function () {
      var test = _reactTestRenderer2.default.create(React.createElement(AccessRoot, null));
      _assert2.default.deepEqual(test.toJSON().children, ['0']);
      var button = test.root.findByType('button');
      button.props.onClick();
      _assert2.default.deepEqual(test.toJSON().children, ['1']);
    });
  });

  (0, _mocha.describe)('lifecycle', function () {
    var LifeCycleApp = function (_AppComponent2) {
      _inherits(LifeCycleApp, _AppComponent2);

      function LifeCycleApp(props) {
        _classCallCheck(this, LifeCycleApp);

        var _this4 = _possibleConstructorReturn(this, (LifeCycleApp.__proto__ || Object.getPrototypeOf(LifeCycleApp)).call(this, props));

        _this4.state = {};
        _this4.logs = [];
        return _this4;
      }

      _createClass(LifeCycleApp, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextAppState) {
          this.logs.push({
            method: 'shouldComponentUpdate',
            prevProps: this.props,
            nextProps: nextProps,
            prevState: this.state,
            nextState: nextState,
            prevAppState: this.appState,
            nextAppState: nextAppState
          });
          return true;
        }
      }, {
        key: 'render',
        value: function render() {
          var _this5 = this;

          return React.createElement(
            'button',
            {
              type: 'button',
              onClick: function onClick() {
                return _this5.setAppState(function (s) {
                  return { count: s.count + 1 };
                });
              }
            },
            this.appState.count
          );
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.logs.push({
            method: 'componentDidMount',
            props: this.props,
            state: this.state,
            appState: this.appState
          });
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, snapshot, prevAppState) {
          this.logs.push({
            method: 'componentDidUpdate',
            prevProps: prevProps,
            nextProps: this.props,
            prevState: prevState,
            nextState: this.state,
            prevAppState: prevAppState,
            nextAppState: this.appState
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.logs.push({
            method: 'componentWillUnmount',
            props: this.props,
            state: this.state,
            appState: this.appState
          });
        }
      }, {
        key: 'invokeStateUpdate',
        value: function invokeStateUpdate() {
          this.setState({ state: 42 });
        }
      }]);

      return LifeCycleApp;
    }(_amorphous.AppComponent);

    var LifeCycleRoot = function (_RootAppComponent2) {
      _inherits(LifeCycleRoot, _RootAppComponent2);

      function LifeCycleRoot(props) {
        _classCallCheck(this, LifeCycleRoot);

        var _this6 = _possibleConstructorReturn(this, (LifeCycleRoot.__proto__ || Object.getPrototypeOf(LifeCycleRoot)).call(this, props));

        _this6.appState = { count: 0 };
        return _this6;
      }

      _createClass(LifeCycleRoot, [{
        key: 'render',
        value: function render() {
          var _this7 = this;

          return React.createElement(LifeCycleApp, Object.assign({ ref: function ref(n) {
              return _this7.node = n;
            } }, this.props));
        }
      }, {
        key: 'invokeStateUpdate',
        value: function invokeStateUpdate() {
          this.node.invokeStateUpdate();
        }
      }]);

      return LifeCycleRoot;
    }(_amorphous.RootAppComponent);

    var MoreSelectiveLifecycle = function (_LifeCycleApp) {
      _inherits(MoreSelectiveLifecycle, _LifeCycleApp);

      function MoreSelectiveLifecycle() {
        _classCallCheck(this, MoreSelectiveLifecycle);

        return _possibleConstructorReturn(this, (MoreSelectiveLifecycle.__proto__ || Object.getPrototypeOf(MoreSelectiveLifecycle)).apply(this, arguments));
      }

      _createClass(MoreSelectiveLifecycle, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextAppState) {
          _get(MoreSelectiveLifecycle.prototype.__proto__ || Object.getPrototypeOf(MoreSelectiveLifecycle.prototype), 'shouldComponentUpdate', this).call(this, nextProps, nextState, nextAppState);
          return nextAppState !== this.appState;
        }
      }]);

      return MoreSelectiveLifecycle;
    }(LifeCycleApp);

    var MoreSelectiveLifecycleRoot = function (_LifeCycleRoot) {
      _inherits(MoreSelectiveLifecycleRoot, _LifeCycleRoot);

      function MoreSelectiveLifecycleRoot() {
        _classCallCheck(this, MoreSelectiveLifecycleRoot);

        return _possibleConstructorReturn(this, (MoreSelectiveLifecycleRoot.__proto__ || Object.getPrototypeOf(MoreSelectiveLifecycleRoot)).apply(this, arguments));
      }

      _createClass(MoreSelectiveLifecycleRoot, [{
        key: 'render',
        value: function render() {
          var _this10 = this;

          return React.createElement(MoreSelectiveLifecycle, Object.assign({ ref: function ref(n) {
              return _this10.node = n;
            } }, this.props));
        }
      }]);

      return MoreSelectiveLifecycleRoot;
    }(LifeCycleRoot);

    (0, _mocha.describe)('shouldComponentUpdate', function () {
      (0, _mocha.it)('is called on change:props', function () {
        var test = _reactTestRenderer2.default.create(React.createElement(LifeCycleRoot, { p: 1 }));
        test.update(React.createElement(LifeCycleRoot, { p: 2 }));
        var logs = test.root.findByType(LifeCycleApp).instance.logs.filter(function (log) {
          return log.method === 'shouldComponentUpdate';
        });
        _assert2.default.deepEqual(logs, [{
          method: 'shouldComponentUpdate',
          prevProps: { p: 1 },
          nextProps: { p: 2 },
          prevState: {},
          nextState: {},
          prevAppState: { count: 0 },
          nextAppState: { count: 0 }
        }]);
      });

      (0, _mocha.it)('is called on change:state', function () {
        var test = _reactTestRenderer2.default.create(React.createElement(LifeCycleRoot, null));
        test.root.instance.invokeStateUpdate();
        var logs = test.root.findByType(LifeCycleApp).instance.logs.filter(function (log) {
          return log.method === 'shouldComponentUpdate';
        });
        _assert2.default.deepEqual(logs, [{
          method: 'shouldComponentUpdate',
          prevProps: {},
          nextProps: {},
          prevState: {},
          nextState: { state: 42 },
          prevAppState: { count: 0 },
          nextAppState: { count: 0 }
        }]);
      });

      (0, _mocha.it)('is called on change:appState', function () {
        var test = _reactTestRenderer2.default.create(React.createElement(LifeCycleRoot, null));
        var button = test.root.findByType('button');
        button.props.onClick();
        var logs = test.root.findByType(LifeCycleApp).instance.logs.filter(function (log) {
          return log.method === 'shouldComponentUpdate';
        });
        _assert2.default.deepEqual(logs, [{
          method: 'shouldComponentUpdate',
          prevProps: {},
          nextProps: {},
          prevState: {},
          nextState: {},
          prevAppState: { count: 0 },
          nextAppState: { count: 1 }
        }]);
      });
    });

    (0, _mocha.describe)('componentDidMount', function () {
      (0, _mocha.it)('is called on mount', function () {
        var test = _reactTestRenderer2.default.create(React.createElement(LifeCycleRoot, null));
        var logs = test.root.findByType(LifeCycleApp).instance.logs.filter(function (log) {
          return log.method === 'componentDidMount';
        });
        _assert2.default.deepEqual(logs, [{
          method: 'componentDidMount',
          props: {},
          state: {},
          appState: { count: 0 }
        }]);
      });

      (0, _mocha.it)('is called exactly once', function () {
        var test = _reactTestRenderer2.default.create(React.createElement(LifeCycleRoot, null));
        test.root.instance.invokeStateUpdate();
        var button = test.root.findByType('button');
        button.props.onClick();
        var logs = test.root.findByType(LifeCycleApp).instance.logs.filter(function (log) {
          return log.method === 'componentDidMount';
        });
        _assert2.default.deepEqual(logs, [{
          method: 'componentDidMount',
          props: {},
          state: {},
          appState: { count: 0 }
        }]);
      });
    });

    (0, _mocha.describe)('componentDidUpdate', function () {
      (0, _mocha.it)('is called on change:props', function () {
        var test = _reactTestRenderer2.default.create(React.createElement(LifeCycleRoot, { p: 1 }));
        test.update(React.createElement(LifeCycleRoot, { p: 2 }));
        var logs = test.root.findByType(LifeCycleApp).instance.logs.filter(function (log) {
          return log.method === 'componentDidUpdate';
        });
        _assert2.default.deepEqual(logs, [{
          method: 'componentDidUpdate',
          prevProps: { p: 1 },
          nextProps: { p: 2 },
          prevState: {},
          nextState: {},
          prevAppState: { count: 0 },
          nextAppState: { count: 0 }
        }]);
      });

      (0, _mocha.it)('is called on change:state', function () {
        var test = _reactTestRenderer2.default.create(React.createElement(LifeCycleRoot, null));
        test.root.instance.invokeStateUpdate();
        var logs = test.root.findByType(LifeCycleApp).instance.logs.filter(function (log) {
          return log.method === 'componentDidUpdate';
        });
        _assert2.default.deepEqual(logs, [{
          method: 'componentDidUpdate',
          prevProps: {},
          nextProps: {},
          prevState: {},
          nextState: { state: 42 },
          prevAppState: { count: 0 },
          nextAppState: { count: 0 }
        }]);
      });

      (0, _mocha.it)('is called on change:appState', function () {
        var test = _reactTestRenderer2.default.create(React.createElement(LifeCycleRoot, null));
        var button = test.root.findByType('button');
        button.props.onClick();
        var logs = test.root.findByType(LifeCycleApp).instance.logs.filter(function (log) {
          return log.method === 'componentDidUpdate';
        });
        _assert2.default.deepEqual(logs, [{
          method: 'componentDidUpdate',
          prevProps: {},
          nextProps: {},
          prevState: {},
          nextState: {},
          prevAppState: { count: 0 },
          nextAppState: { count: 1 }
        }]);
      });

      (0, _mocha.it)('is only called if shouldComponentUpdate => true', function () {
        var test = _reactTestRenderer2.default.create(React.createElement(MoreSelectiveLifecycleRoot, { p: 1 }));
        var getLogs = function getLogs() {
          return test.root.findByType(MoreSelectiveLifecycle).instance.logs.filter(function (log) {
            return log.method === 'componentDidUpdate';
          });
        };
        _assert2.default.deepEqual(getLogs(), []);

        test.update(React.createElement(MoreSelectiveLifecycleRoot, { p: 2 }));
        _assert2.default.deepEqual(getLogs(), []);

        test.root.instance.invokeStateUpdate();
        _assert2.default.deepEqual(getLogs(), []);

        var button = test.root.findByType('button');
        button.props.onClick();
        _assert2.default.deepEqual(getLogs(), [{
          method: 'componentDidUpdate',
          prevProps: { p: 2 },
          nextProps: { p: 2 },
          prevState: { state: 42 },
          nextState: { state: 42 },
          prevAppState: { count: 0 },
          nextAppState: { count: 1 }
        }]);
      });
    });

    (0, _mocha.describe)('componentWillUnmount', function () {
      (0, _mocha.it)('is called on unmount', function () {
        var test = _reactTestRenderer2.default.create(React.createElement(LifeCycleRoot, null));
        var allLogs = test.root.findByType(LifeCycleApp).instance.logs;
        var logs = allLogs.filter(function (log) {
          return log.method === 'componentWillUnmount';
        });
        _assert2.default.deepEqual(logs, []);
        test.unmount();
        logs = allLogs.filter(function (log) {
          return log.method === 'componentWillUnmount';
        });
        _assert2.default.deepEqual(logs, [{
          method: 'componentWillUnmount',
          props: {},
          state: {},
          appState: { count: 0 }
        }]);
      });
    });
  });
});