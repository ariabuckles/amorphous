// @flow
import * as React from 'react';
import type { AppStateContext, SetAppState } from './types';

const createAppStateContext = <AppState: Object>(): AppStateContext<
  AppState
> => {
  return React.createContext({
    get appState() {
      throw new Error(
        'Amorphous: to use appState, you must provide a RootAppComponent at ' +
          'the root of your app/library component tree'
      );
    },
    get setAppState() {
      throw new Error(
        'Amorphous: to use appState, you must provide a RootAppComponent at ' +
          'the root of your app/library component tree'
      );
    },
  });
};

const DefaultAppStateContext: AppStateContext<any> = createAppStateContext();

export { DefaultAppStateContext, createAppStateContext };
