import {definitions} from 'mdast-util-definitions';

import {GREENKEEPER_URL} from './constants.js';

export default function (tree) {
  const getDefinitionByIdentifier = definitions(tree);

  return node => {
    if ('linkReference' === node.type) {
      const definition = getDefinitionByIdentifier(node.identifier);

      return GREENKEEPER_URL === definition.url;
    }

    return false;
  };
}
