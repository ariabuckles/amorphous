'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var AppStateContext = React.createContext({
  appState: {},
  setAppState: function setAppState(update, cb) {
    throw new Error('Amorphous: to use appState, You must provide a RootAppComponent at the ' + 'root of your app/library component tree');
  }
});
exports.default = AppStateContext;