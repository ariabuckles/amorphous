## this.setAppState

### `this.setAppState(update, callback)`

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



