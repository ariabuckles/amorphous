## shouldComponentUpdate

Amorphous provides this.appState and this.setAppState during and after
your component's first render. They are not accessible in the constructor.

Additionally, Amorphous provides an `appState` parameter for the following
React lifecycle methods:

 * `shouldComponentUpdate(nextProps, nextState, nextAppState)`
 * `componentDidUpdate(prevProps, prevState, snapshot, prevAppState)`

You may use either of these methods to monitor changes to `appState`
and update your `AppComponent` properly, just like you would for `state`.

Amorphous AppComponents and RootAppComponents provide a third parameter to
[shouldComponentUpdate][shouldComponentUpdate]: `nextAppState`, which indicates
the next value of `appState`, so that components may avoid rendering if none
of their dependent props/state/appState have changed. See
[lifecycle methods](lifecycle-methods.md) for more details and examples.

[shouldComponentUpdate]: https://reactjs.org/docs/react-component.html#shouldcomponentupdate


