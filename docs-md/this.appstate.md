## this.appState

`appState` allows all AppComponents (including the RootAppComponent) to share
state. It works similarly to `this.state`, but is shared across all AppComponents.

### Initializing `appState`

`appState` is initialized by the RootAppComponent's constructor. By default it
is initialized to `{}`, but you should initialize it to a more reasonable
default in your RootAppComponent class:

```javascript
class App extends RootAppComponent {
  appState = { myToDos: [] };

  // or:
  constructor(props) {
    super(props);
    this.appState = { myToDos: [] };
  }
}
```

### Using `appState`

Amorphous provides `this.appState` in all AppComponents (including your
RootAppComponent).

*NOTE: `this.appState` is not accessible in the constructor of
AppComponents, or in any static methods.*

This means that in `render()` or other methods, you can access `this.appState`
to read your app's current state, and display something based on that:

```javascript
class MyToDoList extends AppComponent {
  render() {
    return (
      <div>
        {this.appState.myToDos.map((todoItem) => (
          <MyToDo item={todoItem} />
        ))}
      </div>
    );
  }
}
```

### Updating `appState`

AppState can be updated from any AppComponent or RootAppComponent using
[`this.setAppState()`](this.setappstate.md).

```
class MyToDoList extends AppComponent {
  render() {
    return (
      <div>
        {this.appState.myToDos.map((todoItem) => (
          <MyToDo item={todoItem} />
        ))}
        <input
          type="button"
          value="Add To-Do"
          onClick={() => this.setAppState({
            myToDos: this.appState.myToDos.concat({
              text: '',
              completed: false,
            }),
          })}
        />
      </div>
    );
  }
}
```

[Read more about setAppState](this.setappstate.md)

### Comparing previous/next `appState` in lifecycle methods

Amorphous provides an additional `appState` parameter to
[`shouldComponentUpdate`](shouldcomponentupdate.md) and
[`componentDidUpdate`](componentdidupdate.md) for AppComponents and
RootAppComponents.  This allows components to compare `this.appState` to
previous/next versions of `appState`.

See [`shouldComponentUpdate`](shouldcomponentupdate.md) and
[`componentDidUpdate`](componentdidupdate.md) for more information.

