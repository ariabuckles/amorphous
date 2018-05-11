import * as React from 'react';

const AppStateContext = React.createContext({
  appState: {},
  setAppState: () => {
    throw new Error(
      'Amorphous: to use appState, You must provide a RootAppComponent at the ' +
      'root of your app/library component tree'
    )
  },
});

export default AppStateContext;
