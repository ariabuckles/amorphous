# Amorphous

[![version](https://img.shields.io/npm/v/amorphous.svg)][npm-package]
[![license](https://img.shields.io/github/license/ariabuckles/amorphous.svg)][LICENSE]
[![build status](https://travis-ci.com/ariabuckles/amorphous.svg?branch=master)][travis-ci]

[npm-package]: https://www.npmjs.com/package/amorphous
[LICENSE]: https://github.com/ariabuckles/amorphous/blob/master/LICENSE
[travis-ci]: https://travis-ci.com/ariabuckles/amorphous

React state management, without the new concepts.

Amorphous makes sharing state in react as easy as using `setState`.
Just like `this.state` is a component's state and can be updated with
`setState`, `this.appState` is an app's state, which can be updated with
`this.setAppState`:

```javascript
class Input extends AppComponent {
  render() {
    return (
      <input
        type="text"
        value={this.appState.text}
        onChange={(e) => this.setAppState({ text: e.target.value })}
      />
    );
  }
}
```

Amorphous is designed to help you get your app's state management up and
running as quickly as possible while avoiding as many pitfalls as possible
given the first constraint.

Amorphous also provides you several tools to help avoid potential pitfalls,
and uses React's new context API to prevent having actual globals that could
poorly interact with third party code.

```javascript
import { AppComponent, RootAppComponent } from './amorphous';

class Input extends AppComponent {

  render() {
    return (
      <input
        type="text"
        value={this.appState.text || 'null'}
        onChange={(e) => this.setAppState({ text: e.target.value })}
      />
    );
  }
}

class Output extends AppComponent {
  render() {
    return (
      <span>
        {'You typed: '}
        {this.appState.text}
      </span>
    );
  }
}

class App extends RootAppComponent {
  appState = { text: 'hi' };

  render() {
    return (
      <div>
        <Input />
        <Output />
      </div>
    );
  }
}
```


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


# Lifecycle Methods

## React Lifecycle

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

