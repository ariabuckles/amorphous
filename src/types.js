// @flow
import * as React from 'react';

export type SetAppState<AppState : Object> =
  ((update: $Shape<AppState> | (appState: AppState) => $Shape<AppState>, cb?: () => void) => void) |
  ((path1: string, update: $Shape<AppState> | (appState: AppState) => $Shape<AppState>, cb?: () => void) => void) |
  ((path1: string, path2: string, update: $Shape<AppState> | (appState: AppState) => $Shape<AppState>, cb?: () => void) => void) |
  ((path1: string, path2: string, path3: string, update: $Shape<AppState> | (appState: AppState) => $Shape<AppState>, cb?: () => void) => void) |
  ((path1: string, path2: string, path3: string, path4: string, update: $Shape<AppState> | (appState: AppState) => $Shape<AppState>, cb?: () => void) => void) |
  ((path1: string, path2: string, path3: string, path4: string, path5: string, update: $Shape<AppState> | (appState: AppState) => $Shape<AppState>, cb?: () => void) => void) |
  ((path1: string, path2: string, path3: string, path4: string, path5: string, path6: string, update: $Shape<AppState> | (appState: AppState) => $Shape<AppState>, cb?: () => void) => void);

export interface GenericAppComponent<Props, State, AppState: Object> {
  +constructor: React.ComponentType<Props>;
  props: Props;
  state: State;
  appState: AppState;

  +render: () => React.Node;
  setAppState: SetAppState<AppState>,

  __AppComponentProxy: React.ComponentType<{
    props: Props,
    state: State,
    appState: AppState,
    setAppState: SetAppState<AppState>,
  }>;
}

export interface ES5ReactComponentType<Props> {
  +prototype: $Shape<React.Component<Props>>;
}
