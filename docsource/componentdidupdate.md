## componentDidUpdate

Amorphous provides this.appState and this.setAppState during and after
your component's first render. They are not accessible in the constructor.

Additionally, Amorphous provides an `appState` parameter for the following
React lifecycle methods:

 * `shouldComponentUpdate(nextProps, nextState, nextAppState)`
 * `componentDidUpdate(prevProps, prevState, snapshot, prevAppState)`

You may use either of these methods to monitor changes to `appState`
and update your `AppComponent` properly, just like you would for `state`.

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



