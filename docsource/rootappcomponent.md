# RootAppComponent

`RootAppComponent` creates a new appState, and should be extended by your
app's root component. Any `AppComponent` must be a descendent of a
`RootAppComponent` (that is, all `AppComponent`s must have a `RootAppComponent`
above them, but not necessarily directly above them, in their component tree)

### Usage

`RootAppComponent` is a base component, so you should `extend` from it just
like you would `React.Component`.

```javascript
class App extends RootAppComponent {
  // ...
}
```

To initialize appState, you should set `appState` either as an instance property
or in the constructor, just as you would with `state`:

```javascript
class App extends RootAppComponent {

  state = {};
  appState = { someProperty: 0 };

  // or:

  constructor(props) {
    super(props);
    this.state = {};
    this.appState = { someProperty: 0 };
  }
}
```

### API

#### `this.appState`

Initialize or access `appState`. `this.appState` should be initialized in your root
component's constructor (or via `appState =` inside the class body).

#### `this.appStateContext`

For library usecases: specify a non-default context for containing `appState`. See
[using Amorphous in a library][using-amorphous-in-a-library.md] for more details.

#### `static getDerivedAppState(appState)`

Calculate computed values on appState. This is called for every `appState` update,
and is merged shallowly into `appState`. See
[lifecycle methods](lifecycle-methods.md) for more details and examples.

#### `shouldComponentUpdate(nextProps, nextState, nextAppState)`

Amorphous AppComponents and RootAppComponents provide a third parameter to
[shouldComponentUpdate][shouldComponentUpdate]: `nextAppState`, which indicates
the next value of `appState`, so that components may avoid rendering if none
of their dependent props/state/appState have changed. See
[lifecycle methods](lifecycle-methods.md) for more details and examples.

[shouldComponentUpdate]: https://reactjs.org/docs/react-component.html#shouldcomponentupdate

#### `componentDidUpdate(prevProps, prevState, snapshot, prevAppState)`

Amorphous AppComponents and RootAppComponents provide a fourth parameter to
[componentDidUpdate][componentDidUpdate]: `prevAppState`, which holds
the value of `appState` before the most recent render, and may be useful
for comparing with the new `this.appState` value to perform non-react
updates after the component has rendered. See
[lifecycle methods](lifecycle-methods.md) for more details and examples.

*Note: `snapshot` is the return value of
[`getSnapshotBeforeUpdate()`][getSnapshotBeforeUpdate], or `undefined`
if no `getSnapshotBeforeUpdate()` is specified.*

[componentDidUpdate]: https://reactjs.org/docs/react-component.html#componentdidupdate
[getSnapshotBeforeUpdate]: https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate


