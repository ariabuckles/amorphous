## AppComponent

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

Access `appState`. `this.appState` should be initialized in your root
component's constructor (or via `appState =` inside the class body).

#### [`this.setAppState(update, callback)`](this.setappstate.md)

#### [`this.appStateContext`](using-amorphous-in-a-library.md)

#### [`shouldComponentUpdate(nextProps, nextState, nextAppState)`](shouldcomponentupdate.md)

#### [`componentDidUpdate(prevProps, prevState, snapshot, prevAppState)`](componentdidupdate.md)

#### And all [React.Component methods](https://reactjs.org/docs/react-component.html)

