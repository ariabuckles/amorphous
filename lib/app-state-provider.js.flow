// @flow
import * as React from 'react';
import { DefaultAppStateContext } from './app-state-context';
import type { SetAppState, AppStateContext } from './types';

const getNewAppStateRecursive = (path, i, subState, update) => {
  if (i === path.length) {
    return Object.assign(
      {},
      subState,
      typeof update === 'function' ? update(subState) : update
    );
  }
  const subPath = path[i];
  return Object.assign(
    {},
    subState[subPath],
    {
      [subPath]: getNewAppStateRecursive(
        path,
        i + 1,
        subState[subPath] || {},
        update
      ),
    }
  );
};

export default class AppStateProvider<AppState: Object> extends React.Component<
  {
    children: React.Node,
    appState: AppState,
    getDerivedAppState: (AppState) => $Shape<AppState>,
  },
  AppState
> {
  setAppState: SetAppState<AppState>;

  constructor(props: {
    children: React.Node,
    context?: AppStateContext<AppState>,
    appState: AppState,
    getDerivedAppState: (AppState) => $Shape<AppState>,
  }) {
    super(props);
    this.state = this.props.appState || {};
    if (props.getDerivedAppState) {
      this.state = Object.assign(
        {},
        this.state,
        props.getDerivedAppState(this.state)
      );
    }
    this.setAppState = this.setAppState.bind(this);
  }

  render() {
    return (
      <DefaultAppStateContext.Provider
        value={{ appState: this.state, setAppState: this.setAppState }}
      >
        {this.props.children}
      </DefaultAppStateContext.Provider>
    );
  }

  setAppState(...args: any) {
    let path = [];
    let i = 0;
    while (i < args.length && typeof args[i] === 'string') {
      path.push(args[i]);
      i++;
    }
    const update = args[i];
    const callback = args[i + 1];
    this.setState((state) => {
      let newState = getNewAppStateRecursive(path, 0, state, update);
      if (this.props.getDerivedAppState) {
        // Mutating is okay because newState is ensured to be a new object
        Object.assign(newState, this.props.getDerivedAppState(newState));
      }
      return newState;
    }, callback);
  }
}
