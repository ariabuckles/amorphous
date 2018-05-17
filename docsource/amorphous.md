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
[using Amorphous in a library][library.md].)

Both `AppComponent` and `RootAppComponent` have access to:

 * `this.appState`
 * `this.setAppState`
 * `shouldComponentUpdate(nextProps, nextState, appState)`
 * `componentDidUpdate(nextProps, nextState, snapshot, appState)`



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


