# Amorphous

[![version](https://img.shields.io/npm/v/amorphous.svg)][npm]
[![license](https://img.shields.io/github/license/ariabuckles/amorphous.svg)][LICENSE]
[![build status](https://travis-ci.com/ariabuckles/amorphous.svg?branch=master)](https://travis-ci.com/ariabuckles/amorphous)
React state management, without the new concepts.

Amorphous is designed to help you get your app's state management up and
running as quickly as possible while avoiding as many pitfalls as possible
given the first constraint.

Amorphous provides you with `this.appState` and `this.setAppState`, which
work like `this.state` and `this.setState`, *but for your whole app (or
library or subtree)*.

Amorphous also provides you several tools to help avoid potential pitfalls,
and uses React's new context API to prevent having actual globals that could
poorly interact with third party code.


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


# Higher Order Components

Amorphous will also support a [higher order component][hoc] interface soon,
if you would prefer not to extend from `AppComponent`.


[hoc]: https://reactjs.org/docs/higher-order-components.html

