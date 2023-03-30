import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import * as referencedBadgePredicateFactory from './referenced-badge-predicate';
import * as remove from '../thirdparty-wrappers/unist-util-remove';
import * as visit from '../thirdparty-wrappers/unist-util-visit';
import {GREENKEEPER_URL} from './constants';
import plugin from './plugin';
import mergeNewlines from './merge-newlines-in-paragraph';

describe('plugin', () => {
  beforeEach(() => {
    vi.mock('../thirdparty-wrappers/unist-util-remove');
    vi.mock('../thirdparty-wrappers/unist-util-visit');
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

    expect(remove.default).toHaveBeenCalledWith(tree, {type: 'link', url: GREENKEEPER_URL});
    expect(remove.default).toHaveBeenCalledWith(tree, {type: 'definition', identifier: 'greenkeeper-badge'});
    expect(remove.default).toHaveBeenCalledWith(tree, {type: 'definition', identifier: 'greenkeeper-link'});
    expect(remove.default).toHaveBeenCalledWith(tree, referencedBadgePredicate);
    expect(visit.default).toHaveBeenCalledWith(tree, {type: 'text', value: '\n'}, mergeNewlines);
  });
});
