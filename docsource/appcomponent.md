# AppComponent

`AppComponent` is a replacement for `React.Component` for any component that
needs access to `appState`. Any `AppComponent` must be a descendent of a
`RootAppComponent` (that is, all `AppComponent`s must have a `RootAppComponent`
above them, but not necessarily directly above them, in their component tree).

### Usage

`AppComponent` is a base component, so you should `extend` from it just
like you would `React.Component`.

```javascript
class SomeComponent extends AppComponent {
  // ...
}
```

Your component can access `this.appState` in `render()`, just like you would
access `this.state`, and can call `this.setAppState` from within any event
handlers, just like you would for `this.setState`

```javascript
class SomeComponent extends AppComponent {

  render() {
    return (
      <input
        type="button"
        value={"clicked " + this.appState.buttonClickedCount + " times"}
        onClick={() => this.setAppState({
          buttonClickedCount: this.appState.buttonClickedCount + 1,
        })}
      />
    );
  }
}
```

### API

#### `this.appState`

Initialize or access `appState`. `this.appState` should be initialized in your root
component's constructor (or via `appState =` inside the class body).

#### `this.setAppState(update, callback)`

Like [`this.setState`][setState] but for app state instead of component state.

[setState]: https://reactjs.org/docs/react-component.html#setstate

`update` may be an object or a function.

**If `update` is an object:**

 * `setAppState` will merge `update` into `this.appState`

**If `update` is a function:**

 * `update` must have the form `(prevAppState) => newAppState`
 * `setAppState` will call `update` with the current appState value, and will
   merge the returned `newAppState` value into `appState`.

`setAppState` is not synchronous, and will call `callback` after it has
completed merging `update` into `appState`.

#### `this.appStateContext`

For library usecases: specify a non-default context for containing `appState`. See
[using Amorphous in a library](using-amorphous-in-a-library.md) for more details.

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


