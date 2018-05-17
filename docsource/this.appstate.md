## this.appState

`appState` allows all AppComponents (including the RootAppComponent) to share
state. It works similarly to `this.state`, but is shared across all AppComponents.

In AppComponents, `this.appState` is accessible in all lifecycle methods, but
not the constructor.

In RootAppComponents, `this.appState` should be initialized in the constructor,
and is thus available in all methods.

AppState can be updated from any AppComponent or RootAppComponent using
[`this.setAppState()`](this.setappstate.md).

[`shouldComponentUpdate`](shouldcomponentupdate.md) and
[`componentDidUpdate`](componentdidupdate.md) for AppComponents and RootAppComponents
have an additional parameter so that components can compare `this.appState` to
previous/next versions of `appState`.


