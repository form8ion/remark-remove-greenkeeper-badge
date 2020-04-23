import any from '@travi/any';
import {assert} from 'chai';
import mergeNewlines from './merge-newlines-in-paragraph';

suite('merge newlines in a paragraph', () => {
  const originalChildren = any.listOf(any.simpleObject);
  const index = any.integer({max: originalChildren.length - 1});

  test('that a newline node is removed if its direct sibling is also a newline', () => {
    const node = {...any.simpleObject(), type: 'text', value: '\n'};
    const parent = {
      ...any.simpleObject(),
      type: 'paragraph',
      children: [
        ...originalChildren.slice(0, index),
        {type: 'text', value: '\n'},
        {type: 'text', value: '\n'},
        ...originalChildren.slice(index)
      ]
    };

    mergeNewlines(node, index, parent);

    assert.deepEqual(
      parent.children,
      [
        ...originalChildren.slice(0, index),
        {type: 'text', value: '\n'},
        ...originalChildren.slice(index)
      ]
    );
  });

  test('that a newline node is removed if node is the last child of the parent', () => {
    const node = {...any.simpleObject(), type: 'text', value: '\n'};
    const parent = {
      ...any.simpleObject(),
      type: 'paragraph',
      children: [
        ...originalChildren,
        {type: 'text', value: '\n'}
      ]
    };

    mergeNewlines(node, originalChildren.length, parent);

    assert.deepEqual(parent.children, originalChildren);
  });

  test('that the children of the parent are unchanged if the parent is not a `paragraph`', () => {
    const node = {...any.simpleObject(), type: 'text', value: '\n'};
    const parent = {...any.simpleObject(), children: [...originalChildren]};

    mergeNewlines(node, index, parent);

    assert.deepEqual(parent.children, originalChildren);
  });

  test('that the children of the parent are unchanged if the node is not a `text` node', () => {
    const node = {...any.simpleObject(), type: any.word(), value: '\n'};
    const parent = {...any.simpleObject(), children: [...originalChildren], type: 'paragraph'};

    mergeNewlines(node, index, parent);

    assert.deepEqual(parent.children, originalChildren);
  });

  test('that the children of the parent are unchanged if the node is not a newline', () => {
    const node = {...any.simpleObject(), type: 'text', value: any.word()};
    const parent = {...any.simpleObject(), children: [...originalChildren], type: 'paragraph'};

    mergeNewlines(node, index, parent);

    assert.deepEqual(parent.children, originalChildren);
  });
});
