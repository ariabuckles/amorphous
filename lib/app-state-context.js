'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppStateContext = exports.DefaultAppStateContext = undefined;

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var createAppStateContext = function createAppStateContext() {
  return React.createContext({
    get appState() {
      throw new Error('Amorphous: to use appState, you must provide a RootAppComponent at ' + 'the root of your app/library component tree');
    },
    get setAppState() {
      throw new Error('Amorphous: to use appState, you must provide a RootAppComponent at ' + 'the root of your app/library component tree');
    }
  });
};


var DefaultAppStateContext = createAppStateContext();

exports.DefaultAppStateContext = DefaultAppStateContext;
exports.createAppStateContext = createAppStateContext;