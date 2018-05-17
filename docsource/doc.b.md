# Getting started

First, install Amorphous by running:

```
npm install amorphous
```

Then, you can import `AppComponent` and `RootAppComponent`:

```javascript
import { AppComponent, RootAppComponent } from 'amorphous';
```

At the root of your application (or subtree), extend
`RootAppComponent` instead of `React.Component`:

```javascript
class App extends RootAppComponent {
  // ...
}
```

And optionally initialize your appState:

```javascript
class App extends RootAppComponent {
  constructor(props) {
    super(props);
    this.appState = {text: 'hi'};
  }
}
```

Then, in any component you want to access appState, extend `AppComponent`
instead of `React.Component`:

```javascript
class Input extends AppComponent {
  // ...
}
```

Inside this component, you can access `this.appState` and update app state
with `this.setAppState`:

```javascript
class Input extends AppComponent {
  render() {
    return <input
      type="text"
      value={this.appState.text}
      onChange={e => this.setAppState({text: e.target.value})}
    />;
  }
}
```

And you're ready to send shared state to anywhere your app needs it!


