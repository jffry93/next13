import { findClosestP, getDeepestTextNode } from './searchNodes';

export const handleSeparateImage = (node) => {
  console.log('handleSeparateImage 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
  const p = findClosestP(node);
  if (p) {
    const images = p.getElementsByTagName('IMG');
    if (images.length > 0) {
      // if node has only whitespace, clear text nodes
      if (p.innerText.trim() === '') {
        Array.from(p.childNodes).forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            p.removeChild(child);
          }
        });
      }

      // if node is not empty, or there's already an image
      if (p.innerText.trim() !== '' || images.length > 1) {
        // If there are more than one image, keep the first image in the node, move the newly added one to a new p element.
        if (images.length > 1) {
          Array.from(images)
            .slice(1)
            .forEach((imgNode, index) => {
              console.log(imgNode.parentNode.outerHTML);
              const newP = document.createElement('p');
              if (index === 0) {
                // For the first extra image, insert new p after the node
                p.parentNode.insertBefore(newP, p.nextSibling);
              } else {
                // For other extra images, insert new p after the last inserted p
                p.parentNode.insertBefore(newP, images[index].nextSibling);
              }
              newP.appendChild(imgNode);
            });
        } else {
          // if the node has text, move the image to a new p element.
          const newP = document.createElement('p');
          // if image is the first child of the node, insert new p before the node
          if (p.firstChild.nodeName === 'IMG') {
            p.parentNode.insertBefore(newP, p);
          }
          // else, insert new p after the node
          else {
            p.parentNode.insertBefore(newP, p.nextSibling);
          }
          newP.appendChild(images[0]);
        }
      }
    }
  }
};

export const handleImageOnDrop = (editor, node, imgNodeBeforeDrag) => {
  console.log('handleImageOnDrop 🌎🌎🌎🌎🌎🌎🌎');
  const p = findClosestP(node);

  // wrap image with anchor if it had an anchor before drag
  if (imgNodeBeforeDrag.nodeName === 'A') {
    // Create a new anchor element
    const newAnchor = document.createElement('a');

    // Copy all attributes from the old anchor to the new one
    for (let i = 0; i < imgNodeBeforeDrag.attributes.length; i++) {
      const attr = imgNodeBeforeDrag.attributes[i];
      newAnchor.setAttribute(attr.name, attr.value);
    }

    // Clone the node and insert the clone inside the anchor
    const cloneNode = node.cloneNode(true);
    // Insert the image inside the anchor
    newAnchor.appendChild(cloneNode);

    // Replace the image node with the new anchor in the DOM
    node.parentNode.replaceChild(newAnchor, node);

    // Update the node reference
    node = newAnchor;
  }
  let cursorPosition = editor.selection.getRng().startOffset;
  console.log('cursorPosition', cursorPosition);
  console.log('parent paragraph of image node', p);
  // create new paragraph element
  const newP = document.createElement('p');
  // check if the paragraph is empty, if so, remove all text nodes
  if (p.innerText.trim() === '') {
    Array.from(p.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        p.removeChild(child);
      }
    });
    return;
  }
  // insert new paragraph after current one
  if (cursorPosition === 0) {
    p.parentNode.insertBefore(newP, p);
  } else {
    p.parentNode.insertBefore(newP, p.nextSibling);
  }

  // Move node (image or anchor) to the new paragraph
  newP.appendChild(node);
  const imageNode = p.querySelector('img');
  editor.selection.select(imageNode);
};

export const handleDragFunction = (node, dragImage) => {
  console.log('handleDragFunction 🌎🌎🌎🌎🌎🌎🌎');
  const p = findClosestP(node);
  if (p) {
    const images = p.getElementsByTagName('IMG');
    if (images.length > 0) {
      // if node has only whitespace, clear text nodes
      if (p.innerText.trim() === '') {
        Array.from(p.childNodes).forEach((child) => {
          // If the child node is a text node, remove it
          if (child.nodeType === Node.TEXT_NODE) {
            p.removeChild(child);
          }
          // If the child node is an image and its parent is an anchor, append the anchor to the p
          else if (
            child.nodeName === 'IMG' &&
            child.parentNode.nodeName === 'A'
          ) {
            p.appendChild(child.parentNode);
          }
        });
      }

      // if node is not empty, or there's already an image
      if (p.innerText.trim() !== '' || images.length > 1) {
        // If there are more than one image, keep the first image in the node, move the newly added one to a new p element.
        if (images.length > 1) {
          Array.from(images)
            .slice(1)
            .forEach((imgNode, index) => {
              const newP = document.createElement('p');
              if (index === 0) {
                // For the first extra image, insert new p after the node
                p.parentNode.insertBefore(newP, p.nextSibling);
              } else {
                // For other extra images, insert new p after the last inserted p
                p.parentNode.insertBefore(newP, images[index].nextSibling);
              }

              // If image is wrapped with an anchor, append the anchor to the newP
              if (imgNode.parentNode.nodeName === 'A') {
                newP.appendChild(imgNode.parentNode);
              }
              // If dragImage was an anchor, wrap the imgNode in an anchor
              else if (dragImage && dragImage.nodeName === 'A') {
                const newA = document.createElement('a');
                newA.href = dragImage.href;
                newA.target = dragImage.target;
                newP.appendChild(newA);
                newA.appendChild(imgNode);
              } else {
                newP.appendChild(imgNode);
              }
            });
        } else {
          // if the node has text, move the image to a new p element.
          const newP = document.createElement('p');
          // if image is the first child of the node, insert new p before the node
          if (p.firstChild.nodeName === 'IMG') {
            p.parentNode.insertBefore(newP, p);
          }
          // else, insert new p after the node
          else {
            p.parentNode.insertBefore(newP, p.nextSibling);
          }

          // If image is wrapped with an anchor, append the anchor to the newP
          if (images[0].parentNode.nodeName === 'A') {
            newP.appendChild(images[0].parentNode);
          }
          // If dragImage was an anchor, wrap the images[0] in an anchor
          else if (dragImage && dragImage.nodeName === 'A') {
            const newA = document.createElement('a');
            newA.href = dragImage.href;
            newA.target = dragImage.target;
            newP.appendChild(newA);
            newA.appendChild(images[0]);
          } else {
            newP.appendChild(images[0]);
          }
        }
      }
    }
  }
};

// prevent cursor to be placed inside p node with image
export const handleImageCaret = (event, editor, prevPNode) => {
  const node = editor.selection.getNode();
  const p = findClosestP(node);
  console.log(event.element.nodeName, '☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️');
  if (p) {
    // handle cursor position if user selects P node with image
    const images = p.getElementsByTagName('IMG');
    if (images.length > 0 && event.element.nodeName !== 'IMG') {
      // Create new paragraph and insert after 'p'
      const newBr = document.createElement('br');
      const newP = document.createElement('p');
      newP.appendChild(newBr);
      // Current cursor position inside p node with image
      let cursorPosition = editor.selection.getRng().startOffset;
      // P node below the current p node
      const prevSibling = p.previousSibling;
      // P node above the current p node
      const nextSibling = p.nextSibling;

      // check to see if the user is about to move back to same p node
      if (prevPNode === prevSibling || prevPNode === nextSibling) {
        const imageNode = p.querySelector('img');
        editor.selection.select(imageNode);
        return;
      }

      // Check if image is wrapped in a link
      if (event.element.nodeName === 'A') {
        if (cursorPosition === 0) {
          cursorPosition = 1;
        } else {
          cursorPosition = 0;
        }
      }

      // When user traverses UP the node tree
      if (cursorPosition === 0) {
        // Current Cursor position is at the START of the paragraph with image

        // Move cursor to start or end of the previous sibling
        if (prevSibling) {
          //setCursorLocation requires a textNode if value is not 0
          // Get the deepest text node within prevSibling
          const textNode = getDeepestTextNode(prevSibling);
          if (textNode) {
            const textNodeLength = textNode.textContent.length;
            const closestP = findClosestP(textNode); // can only scroll to p node
            if (closestP) {
              setTimeout(() => {
                editor.selection.scrollIntoView(closestP, textNodeLength);
                editor.selection.setCursorLocation(textNode, textNodeLength);
              }, 0);
            }
          } else {
            // If there is no textNode, set cursor to the start of prevSibling
            setTimeout(() => {
              editor.selection.scrollIntoView(prevSibling, 0);
              editor.selection.setCursorLocation(prevSibling, 0);
            }, 0);
          }
        } else {
          // if there is no prevSibling above p node with image
          p.parentNode.insertBefore(newP, p);
          setTimeout(() => {
            editor.selection.scrollIntoView(newP, 0);
            editor.selection.setCursorLocation(newP, 0);
          }, 0);
        }
      } else {
        // When user traverses DOWN the node tree
        // Current Cursor position is at the END of the paragraph with image

        // Check to see if nextSibling exists to move cursor to
        if (nextSibling) {
          setTimeout(() => {
            editor.selection.scrollIntoView(nextSibling, 0);
            editor.selection.setCursorLocation(nextSibling, 0);
          }, 0);
        } else {
          // if there is no nextSibling below p node
          p.parentNode.insertBefore(newP, p.nextSibling);
          setTimeout(() => {
            editor.selection.scrollIntoView(newP, 0);
            editor.selection.setCursorLocation(newP, 0);
          }, 0);
        }
      }
    }
  }
};
