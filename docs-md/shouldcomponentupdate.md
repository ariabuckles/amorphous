## shouldComponentUpdate

React provides a [shouldComponentUpdate][shouldComponentUpdate] method
for optimizing components by preventing unnecessary renders.

In Amorphous, this method continues to do the same thing, but is given
an extra parameter, `prevAppState`, so that `shouldComponentUpdate` can
compare differences in `appState` as well as differences in `props` or
`state`:

```javascript
class LengthOutput extends MyAppComponent {

  shouldComponentUpdate(prevProps, prevState, prevAppState) {
    return this.appState.text.length !== prevAppState.text.length;
  }

  render() {
    return (
      <span>
        You have typed {this.appState.text.length} characters
      </span>
    );
  }
}
```

*NOTE: both `this.appState` and `prevAppState` are accessible in
`shouldComponentUpdate`.*

See [React's docs][shouldComponentUpdate] for more information about
the `shouldComponentUpdate` and how to best use it.

[shouldComponentUpdate]: https://reactjs.org/docs/react-component.html#shouldcomponentupdate


