# Amorphous

React state management, without the ceremony.

Amorphous is designed to help you get your app's state management up and
running as quickly as possible while avoiding as many pitfalls as possible
given the first constraint.

Amorphous provides you with `this.appState` and `this.setAppState`, which
work like `this.state` and `this.setState`, *but for your whole app (or
library or subtree)*.

While this sounds dangerous, Amorphous also provides you several tools to
help avoid potential pitfalls, and uses React's new context API to prevent
having actual globals that could poorly interact with third party code.

# Getting started

First, install Amorphous by running:

```
npm install amorphous
```

Then, you can import `AppComponent` and `RootAppComponent`:

```javascript
import { AppComponent, RootAppComponent } from './amorphous';
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

That's all there is to it!
