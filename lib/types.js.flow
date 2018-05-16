// @flow
import * as React from 'react';

export type SetAppState<AppState: Object> = ((
  update: $Shape<AppState> | ((appState: AppState) => $Shape<AppState>),
  cb?: () => void
) => void) &
  ((
    path1: string,
    update: $Shape<AppState> | ((appState: AppState) => $Shape<AppState>),
    cb?: () => void
  ) => void) &
  ((
    path1: string,
    path2: string,
    update: $Shape<AppState> | ((appState: AppState) => $Shape<AppState>),
    cb?: () => void
  ) => void) &
  ((
    path1: string,
    path2: string,
    path3: string,
    update: $Shape<AppState> | ((appState: AppState) => $Shape<AppState>),
    cb?: () => void
  ) => void) &
  ((
    path1: string,
    path2: string,
    path3: string,
    path4: string,
    update: $Shape<AppState> | ((appState: AppState) => $Shape<AppState>),
    cb?: () => void
  ) => void) &
  ((
    path1: string,
    path2: string,
    path3: string,
    path4: string,
    path5: string,
    update: $Shape<AppState> | ((appState: AppState) => $Shape<AppState>),
    cb?: () => void
  ) => void) &
  ((
    path1: string,
    path2: string,
    path3: string,
    path4: string,
    path5: string,
    path6: string,
    update: $Shape<AppState> | ((appState: AppState) => $Shape<AppState>),
    cb?: () => void
  ) => void);

export type AppComponentProxyType<Props, State, AppState> = React.ComponentType<{
    props: Props,
    state: State,
    appState: AppState,
    setAppState: SetAppState<AppState>,
  }>;

export type AppStateContext<AppState> = {
  Provider: React.ComponentType<{value: {
    appState: AppState,
    setAppState: SetAppState<AppState>,
  }}>,
  Consumer: React.ComponentType<{
    children: ({
      appState: AppState,
      setAppState: SetAppState<AppState>
    }) => React.Node // TODO: type this more strictly?
  }>
};

export interface GenericAppComponent<Props, State, AppState: Object> {
  +constructor: React.ComponentType<Props>;
  props: Props;
  state: State;
  appState: AppState;

  +render: () => React.Node;
  setAppState: SetAppState<AppState>;

  +__AppComponentProxy: AppComponentProxyType<Props, State, AppState>;
}

