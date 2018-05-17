# Flow Types

Amorphous has full support for [flow](https://flow.org) types.

Here is the relevant type information for `RootAppComponent` and `AppComponent`:

```typescript
class RootAppComponent<Props, State, AppState: Object>
  extends React.Component<Props, State> {

}

class AppComponent<Props, State, AppState: Object>
  extends React.Component<Props, State> {

}
```

To use these types, you can specify Props, State, and AppState types,
and use these in your component declarations. We recommend creating
your `AppState` type in its own file, which can be included from all
your components.

```typescript
import { RootAppComponent } from 'amorphous';
import type { AppState } from './my-app-state-type.js';

type Props = {
  mode: string,
};

type State = { };

class App extends RootAppComponent<Props, State, AppState> {

  appState: AppState = {
    // ...
  };

  render() {
    // ...
  }
}
```



