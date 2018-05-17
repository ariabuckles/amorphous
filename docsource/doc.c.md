# Lifecycle Methods:

## React Lifecycle:

Amorphous provides this.appState and this.setAppState during and after
your component's first render. They are not accessible in the constructor.

Additionally, Amorphous provides an `appState` parameter for the following
React lifecycle methods:

 * `shouldComponentUpdate(nextProps, nextState, nextAppState)`
 * `componentDidUpdate(prevProps, prevState, snapshot, prevAppState)`

You may use either of these methods to monitor changes to `appState`
and update your `AppComponent` properly, just like you would for `state`.

## `static getDerivedAppState(appState)`

Similar to `getDerivedStateFromProps`, Amorphous supports a static
`getDerivedAppState` method on the `RootAppComponent` only. This
function may be used to trigger additional modifications of appState
when appState is modified, which can be useful for caching expensive
calculations or time-unique values.


