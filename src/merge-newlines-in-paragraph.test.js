import {describe, expect, it} from 'vitest';
import any from '@travi/any';

import mergeNewlines from './merge-newlines-in-paragraph.js';

describe('merge newlines in a paragraph', () => {
  const originalChildren = any.listOf(any.simpleObject);
  const index = any.integer({max: originalChildren.length - 1});

  it('should remove a newline node if its direct sibling is also a newline', () => {
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

    expect(parent.children).toEqual([
      ...originalChildren.slice(0, index),
      {type: 'text', value: '\n'},
      ...originalChildren.slice(index)
    ]);
  });

  it('should remove a newline node if node is the last child of the parent', () => {
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

    expect(parent.children).toEqual(originalChildren);
  });

  it('should not change the children of a parent if the parent is not a `paragraph`', () => {
    const node = {...any.simpleObject(), type: 'text', value: '\n'};
    const parent = {...any.simpleObject(), children: [...originalChildren]};

    mergeNewlines(node, index, parent);

    expect(parent.children).toEqual(originalChildren);
  });

  it('should not change the children of the parent if the node is not a `text` node', () => {
    const node = {...any.simpleObject(), type: any.word(), value: '\n'};
    const parent = {...any.simpleObject(), children: [...originalChildren], type: 'paragraph'};

    mergeNewlines(node, index - 1, parent);

    expect(parent.children).toEqual(originalChildren);
  });

  it('should not change the children of the parent if the node is not a newline', () => {
    const node = {...any.simpleObject(), type: 'text', value: any.word()};
    const parent = {...any.simpleObject(), children: [...originalChildren], type: 'paragraph'};

    mergeNewlines(node, index - 1, parent);

    expect(parent.children).toEqual(originalChildren);
  });
});
