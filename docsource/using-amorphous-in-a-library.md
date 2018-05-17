# Using Amorphous in a Library

If you are a library author using Amorphous, it is important to make
sure your library's appState does not conflict with the client's appState.

Amorphous uses React context to control which components have access
to which appStates. To make a new context for your library, use:

```javascript
import { createAppStateContext } from './amorphous';

const MyAppStateContext = createAppStateContext();
```

Then, to specify that your components use `MyAppStateContext` instead of
the default appState context, set the `appStateContext` property on those
components:

```javascript
class MyApp extends RootAppComponent {
  appStateContext = MyAppStateContext;

  // ...
}

class MyComponent extends AppComponent {
  appStateContext = MyAppStateContext;

  // ...
}
```

To make this less reduntant, I suggest making your own RootAppComponent and
AppComponent classes for your library with extension:


## Making Amorphous classes for your library

```javascript
import { AppComponent, RootAppComponent, createAppStateContext } from './amorphous';

const MyAppStateContext = createAppStateContext();

export class MyAppComponent extends AppComponent {
  appStateContext = MyAppStateContext;
}
export class MyRootAppComponent extends RootAppComponent {
  appStateContext = MyAppStateContext;
}
```

Then everywhere you would use `AppComponent` or `RootAppComponent`, you
can instead use `MyAppComponent` or `MyRootAppComponent` from that file's
exports.


