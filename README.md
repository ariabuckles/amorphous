# Amorphous

[![version](https://img.shields.io/npm/v/amorphous.svg)][npm-package]
[![license](https://img.shields.io/github/license/ariabuckles/amorphous.svg)][LICENSE]
[![build status](https://travis-ci.com/ariabuckles/amorphous.svg?branch=master)][travis-ci]

[npm-package]: https://www.npmjs.com/package/amorphous
[LICENSE]: https://github.com/ariabuckles/amorphous/blob/master/LICENSE
[travis-ci]: https://travis-ci.com/ariabuckles/amorphous

Amorphous makes sharing state in react as easy as using `setState`.

Just as `this.state` is a component's state and can be updated with
`setState`, `this.appState` is an app's state and can be updated with
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

Amorphous is designed to:

 * get your app's state management working as quickly as possible
 * avoid unnecessary pitfalls while doing so

## Usage

Amorphous has two main classes:

 * `AppComponent`: a class for components that use appState
 * `RootAppComponent`: a class for the root component of your app

To use `AppComponent`, you must have a `RootAppComponent` at the
root of your app. (For library authors, see
[using Amorphous in a library](using-amorphous-in-a-library.md).)

Both `AppComponent` and `RootAppComponent` have access to:

 * `this.appState`
 * `this.setAppState`
 * `shouldComponentUpdate(nextProps, nextState, appState)`
 * `componentDidUpdate(nextProps, nextState, snapshot, appState)`

## Full Example:

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


# Using Amorphous in a Library

If you are a library author using Amorphous, it is important to make
sure your library's appState does not conflict with the client's appState.

Amorphous uses React context to control which components have access
to which appStates. To make a new context for your library, use:

```javascript
import { createAppStateContext } from './amorphous';

const MyAppStateContext = createAppStateContext();
```

Then, to specify that your components use `MyAppStateContext` instead of
the default appState context, set the `appStateContext` property on those
components:

```javascript
class MyApp extends RootAppComponent {
  appStateContext = MyAppStateContext;

  // ...
}

class MyComponent extends AppComponent {
  appStateContext = MyAppStateContext;

  // ...
}
```

To make this less reduntant, I suggest making your own RootAppComponent and
AppComponent classes for your library with extension:


## Making Amorphous classes for your library

```javascript
import { AppComponent, RootAppComponent, createAppStateContext } from './amorphous';

const MyAppStateContext = createAppStateContext();

export class MyAppComponent extends AppComponent {
  appStateContext = MyAppStateContext;
}
export class MyRootAppComponent extends RootAppComponent {
  appStateContext = MyAppStateContext;
}
```

Then everywhere you would use `AppComponent` or `RootAppComponent`, you
can instead use `MyAppComponent` or `MyRootAppComponent` from that file's
exports.


# Higher Order Components

Amorphous will also support a [higher order component][hoc] interface soon,
if you would prefer not to extend from `AppComponent`.


[hoc]: https://reactjs.org/docs/higher-order-components.html

