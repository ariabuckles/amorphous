import { strict as assert } from 'assert';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { RootAppComponent, AppComponent } from '../amorphous';

describe('Two AppComponent system', () => {
  class Input extends AppComponent {
    shouldComponentUpdate(nextProps, nextState, nextAppState) {
      return nextAppState.text !== this.appState.text;
    }

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

  class Output extends AppComponent {
    shouldComponentUpdate(nextProps, nextState, nextAppState) {
      return nextAppState.length !== this.appState.length;
    }

    render() {
      return (
        <span>
          {this.appState.length}
        </span>
      );
    }
  }

  class System extends RootAppComponent {
    constructor(props) {
      super(props);
      this.appState = { text: 'hi' };
    }

    static getDerivedAppState = (appState) => {
      return {
        length: appState.text.length,
      };
    };

    render() {
      return (
        <div>
          <Input />
          <Output />
        </div>
      );
    }
  }


  describe('initialization and rendering', () => {
    it('should render an input and a button', () => {
      const test = TestRenderer.create(<System />);
      assert.deepEqual(test.toJSON().children.map(child => child.type), [
        'input', 'span'
      ]);
    });

    it('should render an input with the correct initialized value', () => {
      const test = TestRenderer.create(<System />);
      const input = test.root.findByType('input');
      assert.deepEqual(input.props.value, 'hi');
    });

    it('should render a span with the correct derived value', () => {
      const test = TestRenderer.create(<System />);
      const span = test.root.findByType('span');
      assert.deepEqual(span.children, ['2']);
    });

    it('should render all correct values and derived values', () => {
      const test = TestRenderer.create(<System />);
      // get rid of functions:
      assert.deepEqual(JSON.parse(JSON.stringify(test.toJSON())), {
        type: 'div',
        props: {},
        children: [
          {
            type: 'input',
            props: {
              type: 'text',
              value: 'hi',
            },
            children: null
          },
          {
            type: 'span',
            props: {},
            children: [
              '2',
            ],
          }
        ],
      });
    });
  });

  describe('cross-component interactions', () => {
    it('should send a letter from the input to the output', () => {
      const test = TestRenderer.create(<System />);
      const input = test.root.findByType('input');
      const span = test.root.findByType('span');
      input.props.onChange({target: {value: 'hi!'}});
      assert.deepEqual(input.props.value, 'hi!');
      assert.deepEqual(span.children, ['3']);
    });
  });
});
