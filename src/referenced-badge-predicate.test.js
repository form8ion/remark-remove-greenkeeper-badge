import {definitions} from 'mdast-util-definitions';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import createReferencedBadgePredicate from './referenced-badge-predicate.js';
import {GREENKEEPER_URL} from './constants.js';

describe('badge with referenced definitions', () => {
  const tree = any.simpleObject();
  const nodeIdentifier = any.word();

  beforeEach(() => {
    vi.mock('mdast-util-definitions');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return `false` if the `type` is not `linkReference`', () => {
    expect(createReferencedBadgePredicate(tree)(any.simpleObject())).toBe(false);
  });

  it('should return `false` if the `linkReference` is not the greenkeeper badge', () => {
    const getDefinitionByIdentifier = vi.fn();
    when(definitions).calledWith(tree).mockReturnValue(getDefinitionByIdentifier);
    when(getDefinitionByIdentifier).calledWith(nodeIdentifier).mockReturnValue(any.simpleObject());

    expect(createReferencedBadgePredicate(tree)({
      ...any.simpleObject(),
      type: 'linkReference',
      identifier: nodeIdentifier
    })).toBe(false);
  });

  it('should return `true` when the `linkReference` is the greenkeeper badge', () => {
    const getDefinitionByIdentifier = vi.fn();
    when(definitions).calledWith(tree).mockReturnValue(getDefinitionByIdentifier);
    when(getDefinitionByIdentifier)
      .calledWith(nodeIdentifier)
      .mockReturnValue({...any.simpleObject(), url: GREENKEEPER_URL});

    expect(createReferencedBadgePredicate(tree)({
      ...any.simpleObject(),
      type: 'linkReference',
      identifier: nodeIdentifier
    })).toBe(true);
  });
});
