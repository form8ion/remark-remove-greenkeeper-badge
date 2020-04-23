import remove from '../thirdparty-wrappers/unist-util-remove';
import visit from '../thirdparty-wrappers/unist-util-visit';
import createReferencedBadgePredicate from './referenced-badge-predicate';
import mergeNewlines from './merge-newlines-in-paragraph';
import {GREENKEEPER_URL} from './constants';

export default function () {
  return function transformer(tree) {
    remove(tree, {type: 'link', url: GREENKEEPER_URL});
    remove(tree, createReferencedBadgePredicate(tree));
    remove(tree, {type: 'definition', identifier: 'greenkeeper-badge'});
    remove(tree, {type: 'definition', identifier: 'greenkeeper-link'});
    visit(tree, {type: 'text', value: '\n'}, mergeNewlines);
  };
}
