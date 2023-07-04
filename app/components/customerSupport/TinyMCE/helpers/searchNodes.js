// Helper function to find closest parent 'P' tag
export const findClosestP = (node) => {
  if (node.nodeName === 'P') {
    return node;
  } else if (node.parentNode) {
    return findClosestP(node.parentNode);
  }
  return null;
};

export const getDeepestTextNode = (node) => {
  if (!node) {
    return null;
  }
  if (node.nodeType === Node.TEXT_NODE) {
    return node;
  }
  for (let i = node.childNodes.length - 1; i >= 0; i--) {
    const textNode = getDeepestTextNode(node.childNodes[i]);
    if (textNode) {
      return textNode;
    }
  }
  return null;
};
