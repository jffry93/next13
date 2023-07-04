import { findClosestP, getDeepestTextNode } from './searchNodes';

export const handleSeparateImage = (node) => {
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

export const handleDragFunction = (node, dragImage) => {
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
export const handlePreventCursor = (event, editor, prevPNode) => {
  const node = editor.selection.getNode();
  const p = findClosestP(node);
  if (p) {
    // handle cursor position if user selects P node with image
    const images = p.getElementsByTagName('IMG');
    if (images.length > 0 && event.element.nodeName !== 'IMG') {
      // Current cursor position inside p node with image
      let cursorPosition = editor.selection.getRng().startOffset;
      // P node below the current p node
      const prevSibling = p.previousSibling;
      // P node above the current p node
      const nextSibling = p.nextSibling;
      if (event.element.nodeName === 'A') {
        // console.log(p);
        // console.log(node);
        // console.log('hello world');
        // console.log(nextSibling);
        // console.log(cursorPosition);

        if (cursorPosition === 0) {
          cursorPosition = 1;
        } else {
          cursorPosition = 0;
        }
      }

      // When user traverses UP the node tree
      if (cursorPosition === 0) {
        // Current Cursor position is at the START of the paragraph with image

        // check to see if the user is about to move back to same p node
        if (prevPNode === prevSibling) {
          // move to next sibling instead of prevSibling if it exists
          if (nextSibling) {
            console.log(nextSibling);
            setTimeout(() => {
              console.log(nextSibling);
              editor.selection.scrollIntoView(nextSibling, 0);
              editor.selection.setCursorLocation(nextSibling, 0);
            }, 0);
            return;
          }
          // if cursor is about to move to SAME P node and there is no next sibling
          // Create new paragraph and insert after 'p'
          const newBr = document.createElement('br');
          const newP = document.createElement('p');
          newP.appendChild(newBr);
          p.parentNode.insertBefore(newP, p.nextSibling);
          setTimeout(() => {
            editor.selection.scrollIntoView(newP, 0);
            editor.selection.setCursorLocation(newP, 0);
          }, 0);
          return;
        }
        // Move cursor to the end of the previous sibling
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
          // Create new paragraph and insert after 'p'
          const newBr = document.createElement('br');
          const newP = document.createElement('p');
          newP.appendChild(newBr);
          p.parentNode.insertBefore(newP, p);
          setTimeout(() => {
            editor.selection.scrollIntoView(newP, 0);
            editor.selection.setCursorLocation(newP, 0);
          }, 0);
        }
      } else {
        // When user traverses DOWN the node tree
        // Current Cursor position is at the END of the paragraph with image

        // Check to see if user is about to move to SAME p node
        if (prevPNode === nextSibling) {
          // move to prevSibling instead of nextSibling if it exists
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
            return;
          }
          if (textNode) {
            return;
          }
          // if cursor is about to move to same P node and there is no prevSibling
          // Create new paragraph and insert before 'p'
          const newBr = document.createElement('br');
          const newP = document.createElement('p');
          newP.appendChild(newBr);
          p.parentNode.insertBefore(newP, p);
          setTimeout(() => {
            editor.selection.scrollIntoView(newP, 0),
              editor.selection.setCursorLocation(newP, 0);
          }, 0);
          return;
        }

        // Check to see if nextSibling exists to move cursor to
        if (nextSibling) {
          setTimeout(() => {
            editor.selection.scrollIntoView(nextSibling, 0);
            editor.selection.setCursorLocation(nextSibling, 0);
          }, 0);
        } else {
          // if there is no nextSibling below p node
          // Create new paragraph and insert after 'p'
          const newBr = document.createElement('br');
          const newP = document.createElement('p');
          newP.appendChild(newBr);
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
