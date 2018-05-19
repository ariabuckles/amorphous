## RootAppComponent

`RootAppComponent` creates a new appState, and should be extended by your
app's root component. Any `AppComponent` must be a descendent of a
`RootAppComponent` (that is, all `AppComponent`s must have a `RootAppComponent`
above them, but not necessarily directly above them, in their component tree).

### Usage

`RootAppComponent` is a base component, so you should `extend` from it
like you would `React.Component`.

```javascript
class App extends RootAppComponent {
  // ...
}
```

To initialize appState, you should set `appState` either as an instance property
or in the constructor, as you would with `state`:

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

#### [`this.setAppState(update, callback)`](this.setappstate.md)

#### [`this.appStateContext`](using-amorphous-in-a-library.md)

#### [`shouldComponentUpdate(nextProps, nextState, nextAppState)`](shouldcomponentupdate.md)

#### [`componentDidUpdate(prevProps, prevState, snapshot, prevAppState)`](componentdidupdate.md)

#### And all [React.Component methods](https://reactjs.org/docs/react-component.html)

