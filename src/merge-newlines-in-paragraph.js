function nodeIsLastChild(index, parent) {
  return index === parent.children.length - 1;
}

function nextSiblingIsNewline(nextSibling) {
  return nextSibling && 'text' === nextSibling.type && '\n' === nextSibling.value;
}

export default function (node, index, parent) {
  if ('paragraph' === parent.type) {
    const nextSibling = parent.children[index + 1];

    if (nodeIsLastChild(index, parent) || nextSiblingIsNewline(nextSibling)) {
      parent.children.splice(index, 1);
    }
  }
}
