# About Amorphous

[![version](https://img.shields.io/npm/v/amorphous.svg)][npm-package]
[![license](https://img.shields.io/github/license/ariabuckles/amorphous.svg)][LICENSE]
[![build status](https://travis-ci.com/ariabuckles/amorphous.svg?branch=master)][travis-ci]
[![Coverage Status](https://coveralls.io/repos/github/ariabuckles/amorphous/badge.svg)][coverage]
[![docs](https://img.shields.io/badge/docs-js.org-ff69b4.svg)][docs]

[npm-package]: https://www.npmjs.com/package/amorphous
[LICENSE]: https://github.com/ariabuckles/amorphous/blob/master/LICENSE
[travis-ci]: https://travis-ci.com/ariabuckles/amorphous
[coverage]: https://coveralls.io/github/ariabuckles/amorphous
[docs]: https://amorphous.js.org

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

### Usage

Amorphous has two main classes:

 * `AppComponent`: a class for components that use appState
 * `RootAppComponent`: a class for the root component of your app

To use `AppComponent`, you must have a `RootAppComponent` at the
root of your app. (For library authors, see
[using Amorphous in a library](docs-md/using-amorphous-in-a-library.md).)

Both `AppComponent` and `RootAppComponent` have access to:

 * `this.appState`
 * `this.setAppState`
 * `shouldComponentUpdate(nextProps, nextState, appState)`
 * `componentDidUpdate(nextProps, nextState, snapshot, appState)`

### Full Example:

```javascript
import { AppComponent, RootAppComponent } from 'amorphous';

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

# API

 * [RootAppComponent](docs-md/rootappcomponent.md)
 * [AppComponent](docs-md/appcomponent.md)
 * [this.appState](docs-md/this.appstate.md)
 * [this.setAppState](docs-md/this.setappstate.md)
 * [shouldComponentUpdate](docs-md/shouldcomponentupdate.md)
 * [componentDidUpdate](docs-md/componentdidupdate.md)
 * [this.appStateContext](docs-md/using-amorphous-in-a-library.md)

## RootAppComponent

`RootAppComponent` creates a new appState, and should be extended by your
app's root component. Any `AppComponent` must be a descendent of a
`RootAppComponent` (that is, all `AppComponent`s must have a `RootAppComponent`
above them, but not necessarily directly above them, in their component tree).

### Usage

`RootAppComponent` is a base component, so you should `extend` from it
like you would `React.Component`.

```javascript
class App extends RootAppComponent {
  // ...
}
```

To initialize appState, you should set `appState` either as an instance property
or in the constructor, as you would with `state`:

```javascript
class App extends RootAppComponent {

  state = {};
  appState = { someProperty: 0 };

  // or:
  constructor(props) {
    super(props);
    this.state = {};
    this.appState = { someProperty: 0 };
  }
}
```

### API

#### `this.appState`

Initialize or access `appState`. `this.appState` should be initialized in your root
component's constructor (or via `appState =` inside the class body).

#### [`this.setAppState(update, callback)`](docs-md/this.setappstate.md)

#### [`this.appStateContext`](docs-md/using-amorphous-in-a-library.md)

#### [`shouldComponentUpdate(nextProps, nextState, nextAppState)`](docs-md/shouldcomponentupdate.md)

#### [`componentDidUpdate(prevProps, prevState, snapshot, prevAppState)`](docs-md/componentdidupdate.md)

#### And all [React.Component methods](https://reactjs.org/docs/react-component.html)

## AppComponent

`AppComponent` is a replacement for `React.Component` for any component that
needs access to `appState`. Any `AppComponent` must be a descendent of a
`RootAppComponent` (that is, all `AppComponent`s must have a `RootAppComponent`
above them, but not necessarily directly above them, in their component tree).

### Usage

`AppComponent` is a base component, so you should `extend` from it
like you would `React.Component`.

```javascript
class SomeComponent extends AppComponent {
  // ...
}
```

Your component can access `this.appState` in `render()`, as you would
access `this.state`, and can call `this.setAppState` from within any event
handlers, as you would for `this.setState`.

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

#### [`this.setAppState(update, callback)`](docs-md/this.setappstate.md)

#### [`this.appStateContext`](docs-md/using-amorphous-in-a-library.md)

#### [`shouldComponentUpdate(nextProps, nextState, nextAppState)`](docs-md/shouldcomponentupdate.md)

#### [`componentDidUpdate(prevProps, prevState, snapshot, prevAppState)`](docs-md/componentdidupdate.md)

#### And all [React.Component methods](https://reactjs.org/docs/react-component.html)

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
[`this.setAppState()`](docs-md/this.setappstate.md).

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

[Read more about setAppState](docs-md/this.setappstate.md)

### Comparing previous/next `appState` in lifecycle methods

Amorphous provides an additional `appState` parameter to
[`shouldComponentUpdate`](docs-md/shouldcomponentupdate.md) and
[`componentDidUpdate`](docs-md/componentdidupdate.md) for AppComponents and
RootAppComponents.  This allows components to compare `this.appState` to
previous/next versions of `appState`.

See [`shouldComponentUpdate`](docs-md/shouldcomponentupdate.md) and
[`componentDidUpdate`](docs-md/componentdidupdate.md) for more information.

## this.setAppState

### `this.setAppState(update, callback)`

Like [`this.setState`][setState] but for app state instead of component state.

[setState]: https://reactjs.org/docs/react-component.html#setstate

`update` may be an object or a function.

**If `update` is an object:**

 * `setAppState` will merge `update` into `this.appState`

**If `update` is a function:**

 * `update` must have the form `(prevAppState) => newAppState`
 * `setAppState` will call `update` with the current appState value, and will
   merge the returned `newAppState` value into `appState`.

`setAppState` is not synchronous, and will call `callback` after it has
completed merging `update` into `appState`.


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


## componentDidUpdate

Amorphous provides this.appState and this.setAppState during and after
your component's first render. They are not accessible in the constructor.

Additionally, Amorphous provides an `appState` parameter for the following
React lifecycle methods:

 * `shouldComponentUpdate(nextProps, nextState, nextAppState)`
 * `componentDidUpdate(prevProps, prevState, snapshot, prevAppState)`

You may use either of these methods to monitor changes to `appState`
and update your `AppComponent` properly, like you would for `this.state`.

Amorphous AppComponents and RootAppComponents provide a fourth parameter to
[componentDidUpdate][componentDidUpdate]: `prevAppState`, which holds
the value of `appState` before the most recent render, and may be useful
for comparing with the new `this.appState` value to perform non-react
updates after the component has rendered. See
[lifecycle methods](docs-md/lifecycle-methods.md) for more details and examples.

*Note: `snapshot` is the return value of
[`getSnapshotBeforeUpdate()`][getSnapshotBeforeUpdate], or `undefined`
if no `getSnapshotBeforeUpdate()` is specified.*

[componentDidUpdate]: https://reactjs.org/docs/react-component.html#componentdidupdate
[getSnapshotBeforeUpdate]: https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate


## getDerivedAppState

### `static getDerivedAppState(appState)`

Similar to `getDerivedStateFromProps`, Amorphous supports a static
`getDerivedAppState` method on the `RootAppComponent` only. This
function may be used to trigger additional modifications of appState
when appState is modified, which can be useful for caching expensive
calculations or time-unique values.

Example:

```javascript

```


# Using Amorphous in a Library

If you are a library author using Amorphous, it is important to make
sure your library's appState does not conflict with the client's appState.

Amorphous uses React context to control which components have access
to which appStates. To make a new context for your library, use:

```javascript
import { createAppStateContext } from 'amorphous';

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


### Making Amorphous classes for your library

```javascript
import { AppComponent, RootAppComponent, createAppStateContext } from 'amorphous';

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

# Using Amorphous with Flow

Amorphous has full support for [flow](https://flow.org) types.

The relevant type information for `RootAppComponent` and `AppComponent` is:

```typescript
class RootAppComponent<Props, State, AppState: Object>
  extends React.Component<Props, State> {

}

class AppComponent<Props, State, AppState: Object>
  extends React.Component<Props, State> {

}
```

To use these types, you can specify Props, State, and AppState types,
and use these in your component declarations. We recommend creating
your `AppState` type in its own file, which can be included from all
your components.

```typescript
import { RootAppComponent } from 'amorphous';
import type { AppState } from './my-app-state-type.js';

type Props = {
  mode: string,
};

type State = { };

class App extends RootAppComponent<Props, State, AppState> {

  appState: AppState = {
    // ...
  };

  render() {
    // ...
  }
}
```


