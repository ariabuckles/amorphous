// @flow

import { describe, it } from 'mocha'
import assert from 'assert';
// TODO: import { strict as assert } from 'assert'; once flow supports strict assert
import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { RootAppComponent, AppComponent, DefaultAppStateContext } from '../amorphous';

// Disable react error boundary warnings for throws blocks
const assertThrows = (block) => {
  const consoleError = console.error;
  (console : any).error = () => {};

  assert.throws(() => {
    block();
  });

  (console : any).error = consoleError;
};

describe('Error Messages for the following situations', () => {
  describe('rendering an AppComponent with no RootAppComponent', () => {

    it('this.appState should error', () => {
      class Comp extends AppComponent<{}, void, { count?: number }> {
        render() {
          return (
            <span>{this.appState.count || 0}</span>
          );
        }
      }

      assertThrows(() => {
        TestRenderer.create(<Comp />);
      });
    });

    it('this.setAppState should error', () => {
      class Comp extends AppComponent<{}, void, { count?: number }> {
        render() {
          return (
            <button
              type="button"
              onClick={() =>
                this.setAppState((s) => ({ count: (s.count || 0) + 1 }))
              }
            >
              "click me"
            </button>
          );
        }
      }

      assertThrows(() => {
        TestRenderer.create(<Comp />);
      });
    });

    it('AppComponent should error without any appState access', () => {
      class Comp extends AppComponent<any, void, any> {
        render() {
          return (
            <span>hi!</span>
          );
        }
      }

      assertThrows(() => {
        TestRenderer.create(<Comp />);
      });
    });

    it('DefaultAppStateContext should error on setAppState access', () => {
      class Comp extends React.Component<any, void> {
        render() {
          return (
            <DefaultAppStateContext.Consumer>
              {(contextValue) => <span>{contextValue.appState}</span>}
            </DefaultAppStateContext.Consumer>
          );
        }
      }

      assertThrows(() => {
        TestRenderer.create(<Comp />);
      });
    });

    it('DefaultAppStateContext should error on appState access', () => {
      class Comp extends React.Component<any, void> {
        render() {
          return (
            <DefaultAppStateContext.Consumer>
              {(contextValue) => {
                const setAppState = contextValue.setAppState;
                return <input
                  type="button"
                  value="click"
                  onClick={() => setAppState({clicked: true})}
                />;
              }}
            </DefaultAppStateContext.Consumer>
          );
        }
      }

      assertThrows(() => {
        TestRenderer.create(<Comp />);
      });
    });
  });
});
