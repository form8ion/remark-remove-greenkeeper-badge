import {remove} from 'unist-util-remove';
import {visit} from 'unist-util-visit';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import * as referencedBadgePredicateFactory from './referenced-badge-predicate.js';
import {GREENKEEPER_URL} from './constants.js';
import mergeNewlines from './merge-newlines-in-paragraph.js';
import plugin from './plugin.js';

describe('plugin', () => {
  beforeEach(() => {
    vi.mock('unist-util-remove');
    vi.mock('unist-util-visit');
    vi.mock('./referenced-badge-predicate');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should remove a greenkeeper badge, whether inline or refefenced', () => {
    const tree = any.simpleObject();
    const referencedBadgePredicate = vi.fn();
    when(referencedBadgePredicateFactory.default).calledWith(tree).mockReturnValue(referencedBadgePredicate);

    plugin()(tree);

    expect(remove).toHaveBeenCalledWith(tree, {type: 'link', url: GREENKEEPER_URL});
    expect(remove).toHaveBeenCalledWith(tree, {type: 'definition', identifier: 'greenkeeper-badge'});
    expect(remove).toHaveBeenCalledWith(tree, {type: 'definition', identifier: 'greenkeeper-link'});
    expect(remove).toHaveBeenCalledWith(tree, referencedBadgePredicate);
    expect(visit).toHaveBeenCalledWith(tree, {type: 'text', value: '\n'}, mergeNewlines);
  });
});
