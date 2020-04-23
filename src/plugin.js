import remove from '../thirdparty-wrappers/unist-util-remove';
import createReferencedBadgePredicate from './referenced-badge-predicate';
import {GREENKEEPER_URL} from './constants';

export default function () {
  return function transformer(tree) {
    remove(tree, {type: 'link', url: GREENKEEPER_URL});
    remove(tree, createReferencedBadgePredicate(tree));
    remove(tree, {type: 'definition', identifier: 'greenkeeper-badge'});
    remove(tree, {type: 'definition', identifier: 'greenkeeper-link'});
  };
}
