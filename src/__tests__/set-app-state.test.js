// @flow
import {describe, it} from 'mocha'
import assert from 'assert';
// TODO: import { strict as assert } from 'assert'; once flow supports strict assert
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { RootAppComponent } from '../amorphous';

describe('setAppState', () => {

  class AccessRoot extends RootAppComponent<{}, void, any> {
    render() {
      return (
        <button
          type="button"
          onClick={() =>
            this.setAppState('button', (s) => ({ count: (s.count || 0) + 1 }))
          }
        >
          {this.appState.button && this.appState.button.count ?
            this.appState.button.count
          :
            0
          }
        </button>
      );
    }
  }

  it('can set and read path-specified appState', () => {
    const test = TestRenderer.create(<AccessRoot />);
    assert.deepEqual(test.toJSON().children, ['0']);
    const button = test.root.findByType('button');
    console.log(test.root.instance.appState);
    button.props.onClick();
    console.log(test.root.instance.appState);
    assert.deepEqual(test.toJSON().children, ['1']);
  });
});
