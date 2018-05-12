import { strict as assert } from 'assert';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { RootAppComponent, AppComponent } from '../amorphous';

describe('Single AppComponent', () => {
  describe('appState access', () => {
    class AccessApp extends AppComponent {
      render() {
        return (
          <button
            type="button"
            onClick={() =>
              this.setAppState((s) => ({ count: (s.count || 0) + 1 }))
            }
          >
            {this.appState.count || 0}
          </button>
        );
      }
    }

    class AccessRoot extends RootAppComponent {
      render() {
        return (
          <AccessApp />
        );
      }
    }

    it('can set and retrieve appState', () => {
      const test = TestRenderer.create(<AccessRoot />);
      assert.deepEqual(test.toJSON().children, ['0']);
      const button = test.root.findByType('button');
      button.props.onClick();
      assert.deepEqual(test.toJSON().children, ['1']);
    });
  });

  describe('lifecycle', () => {
    class LifeCycleApp extends AppComponent {
      constructor(props) {
        super(props);
        this.state = {};
        this.logs = [];
      }

      shouldComponentUpdate(nextProps, nextState, nextAppState) {
        this.logs.push({
          method: 'shouldComponentUpdate',
          prevProps: this.props,
          nextProps: nextProps,
          prevState: this.state,
          nextState: nextState,
          prevAppState: this.appState,
          nextAppState: nextAppState,
        });
        return true;
      }

      render() {
        return (
          <button
            type="button"
            onClick={() => this.setAppState((s) => ({ count: s.count + 1 }))}
          >
            {this.appState.count}
          </button>
        );
      }

      componentDidMount() {
        this.logs.push({
          method: 'componentDidMount',
          props: this.props,
          state: this.state,
          appState: this.appState,
        });
      }

      componentDidUpdate(prevProps, prevState, snapshot, prevAppState) {
        this.logs.push({
          method: 'componentDidUpdate',
          prevProps: prevProps,
          nextProps: this.props,
          prevState: prevState,
          nextState: this.state,
          prevAppState: prevAppState,
          nextAppState: this.appState,
        });
      }

      componentWillUnmount() {
        this.logs.push({
          method: 'componentWillUnmount',
          props: this.props,
          state: this.state,
          appState: this.appState,
        });
      }

      invokeStateUpdate() {
        this.setState({ state: 42 });
      }
    }

    class LifeCycleRoot extends RootAppComponent {
      constructor(props) {
        super(props);
        this.appState = { count: 0 };
      }
      render() {
        return <LifeCycleApp ref={n => this.node = n} {...this.props} />;
      }
      invokeStateUpdate() {
        this.node.invokeStateUpdate();
      }
    }

    class MoreSelectiveLifecycle extends LifeCycleApp {
      shouldComponentUpdate(nextProps, nextState, nextAppState) {
        super.shouldComponentUpdate(nextProps, nextState, nextAppState);
        return nextAppState !== this.appState;
      }
    }

    class MoreSelectiveLifecycleRoot extends LifeCycleRoot {
      render() {
        return <MoreSelectiveLifecycle ref={n => this.node = n} {...this.props} />;
      }
    }

    describe('shouldComponentUpdate', () => {
      it('is called on change:props', () => {
        const test = TestRenderer.create(<LifeCycleRoot p={1} />);
        test.update(<LifeCycleRoot p={2} />);
        const logs = test.root.findByType(LifeCycleApp).instance.logs.filter(
          (log) => log.method === 'shouldComponentUpdate'
        );
        assert.deepEqual(logs, [
          {
            method: 'shouldComponentUpdate',
            prevProps: { p: 1 },
            nextProps: { p: 2 },
            prevState: {},
            nextState: {},
            prevAppState: { count: 0 },
            nextAppState: { count: 0 },
          },
        ]);
      });

      it('is called on change:state', () => {
        const test = TestRenderer.create(<LifeCycleRoot />);
        test.root.instance.invokeStateUpdate();
        const logs = test.root.findByType(LifeCycleApp).instance.logs.filter(
          (log) => log.method === 'shouldComponentUpdate'
        );
        assert.deepEqual(logs, [
          {
            method: 'shouldComponentUpdate',
            prevProps: {},
            nextProps: {},
            prevState: {},
            nextState: { state: 42 },
            prevAppState: { count: 0 },
            nextAppState: { count: 0 },
          },
        ]);
      });

      it('is called on change:appState', () => {
        const test = TestRenderer.create(<LifeCycleRoot />);
        const button = test.root.findByType('button');
        button.props.onClick();
        const logs = test.root.findByType(LifeCycleApp).instance.logs.filter(
          (log) => log.method === 'shouldComponentUpdate'
        );
        assert.deepEqual(logs, [
          {
            method: 'shouldComponentUpdate',
            prevProps: {},
            nextProps: {},
            prevState: {},
            nextState: {},
            prevAppState: { count: 0 },
            nextAppState: { count: 1 },
          },
        ]);
      });
    });

    describe('componentDidMount', () => {
      it('is called on mount', () => {
        const test = TestRenderer.create(<LifeCycleRoot />);
        const logs = test.root.findByType(LifeCycleApp).instance.logs.filter(
          (log) => log.method === 'componentDidMount'
        );
        assert.deepEqual(logs, [
          {
            method: 'componentDidMount',
            props: {},
            state: {},
            appState: { count: 0 },
          },
        ]);
      });

      it('is called exactly once', () => {
        const test = TestRenderer.create(<LifeCycleRoot />);
        test.root.instance.invokeStateUpdate();
        const button = test.root.findByType('button');
        button.props.onClick();
        const logs = test.root.findByType(LifeCycleApp).instance.logs.filter(
          (log) => log.method === 'componentDidMount'
        );
        assert.deepEqual(logs, [
          {
            method: 'componentDidMount',
            props: {},
            state: {},
            appState: { count: 0 },
          },
        ]);
      });
    });

    describe('componentDidUpdate', () => {
      it('is called on change:props', () => {
        const test = TestRenderer.create(<LifeCycleRoot p={1} />);
        test.update(<LifeCycleRoot p={2} />);
        const logs = test.root.findByType(LifeCycleApp).instance.logs.filter(
          (log) => log.method === 'componentDidUpdate'
        );
        assert.deepEqual(logs, [
          {
            method: 'componentDidUpdate',
            prevProps: { p: 1 },
            nextProps: { p: 2 },
            prevState: {},
            nextState: {},
            prevAppState: { count: 0 },
            nextAppState: { count: 0 },
          },
        ]);
      });

      it('is called on change:state', () => {
        const test = TestRenderer.create(<LifeCycleRoot />);
        test.root.instance.invokeStateUpdate();
        const logs = test.root.findByType(LifeCycleApp).instance.logs.filter(
          (log) => log.method === 'componentDidUpdate'
        );
        assert.deepEqual(logs, [
          {
            method: 'componentDidUpdate',
            prevProps: {},
            nextProps: {},
            prevState: {},
            nextState: { state: 42 },
            prevAppState: { count: 0 },
            nextAppState: { count: 0 },
          },
        ]);
      });

      it('is called on change:appState', () => {
        const test = TestRenderer.create(<LifeCycleRoot />);
        const button = test.root.findByType('button');
        button.props.onClick();
        const logs = test.root.findByType(LifeCycleApp).instance.logs.filter(
          (log) => log.method === 'componentDidUpdate'
        );
        assert.deepEqual(logs, [
          {
            method: 'componentDidUpdate',
            prevProps: {},
            nextProps: {},
            prevState: {},
            nextState: {},
            prevAppState: { count: 0 },
            nextAppState: { count: 1 },
          },
        ]);
      });

      it('is only called if shouldComponentUpdate => true', () => {
        const test = TestRenderer.create(<MoreSelectiveLifecycleRoot p={1} />);
        const getLogs = () =>
          test.root.findByType(MoreSelectiveLifecycle).instance.logs.filter(
            (log) => log.method === 'componentDidUpdate'
          );
        assert.deepEqual(getLogs(), []);

        test.update(<MoreSelectiveLifecycleRoot p={2} />);
        assert.deepEqual(getLogs(), []);

        test.root.instance.invokeStateUpdate();
        assert.deepEqual(getLogs(), []);

        const button = test.root.findByType('button');
        button.props.onClick();
        assert.deepEqual(getLogs(), [
          {
            method: 'componentDidUpdate',
            prevProps: { p: 2 },
            nextProps: { p: 2 },
            prevState: { state: 42 },
            nextState: { state: 42 },
            prevAppState: { count: 0 },
            nextAppState: { count: 1 },
          },
        ]);
      });
    });

    describe('componentWillUnmount', () => {
      it('is called on unmount', () => {
        const test = TestRenderer.create(<LifeCycleRoot />);
        const allLogs = test.root.findByType(LifeCycleApp).instance.logs;
        let logs = allLogs.filter(
          (log) => log.method === 'componentWillUnmount'
        );
        assert.deepEqual(logs, []);
        test.unmount();
        logs = allLogs.filter((log) => log.method === 'componentWillUnmount');
        assert.deepEqual(logs, [
          {
            method: 'componentWillUnmount',
            props: {},
            state: {},
            appState: { count: 0 },
          },
        ]);
      });
    });
  });
});
