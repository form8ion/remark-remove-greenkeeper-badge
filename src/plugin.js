import remove from '../thirdparty-wrappers/unist-util-remove';

export default function () {
  return function transformer(node) {
    remove(node, {type: 'link', url: 'https://greenkeeper.io/'});
  };
}
