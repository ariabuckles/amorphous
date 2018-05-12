import { strict as assert } from 'assert';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { RootAppComponent } from './amorphous';



describe('RootAppComponent', () => {

  describe('appState access', () => {

    class AccessRoot extends RootAppComponent {
      render() {
        return <button
          type="button"
          onClick={() => this.setAppState(s => ({count: (s.count || 0) + 1}))}
        >
          {this.appState.count || 0}
        </button>;
      }
    }

    it('can set and retrieve appState', () => {
      const test = TestRenderer.create(<AccessRoot />);
      assert.deepEqual(test.toJSON().children, [ '0' ]);
      const button = test.root.findByType('button');
      button.props.onClick();
      assert.deepEqual(test.toJSON().children, [ '1' ]);
    });

  });

  describe('lifecycle', () => {

    class LifeCycleRoot extends RootAppComponent {
      constructor(props) {
        super(props);
        this.appState = { count: 0 };
        this.logs = [];
      }

      render() {
        return <button
          type="button"
          onClick={() => this.setAppState(s => ({count: s.count + 1}))}
        >
          {this.appState.count}
        </button>;
      }

      componentDidUpdate(prevProps, prevState, snapshot, prevAppState) {
        this.logs.push({
          method: 'componentDidUpdate',
          prevAppState: prevAppState,
          nextAppState: this.appState,
        });
      }
    }

    it('calls componentDidUpdate', () => {
      const test = TestRenderer.create(<LifeCycleRoot />);
      const button = test.root.findByType('button');
      button.props.onClick();
      const logs = test.root.instance.logs.filter(log => log.method === 'componentDidUpdate');
      assert.deepEqual(logs, [{
        method: 'componentDidUpdate',
        prevAppState: { count: 0 },
        nextAppState: { count: 1 },
      }]);
    });

  });
});
