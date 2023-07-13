'use client';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { extractTextFromHtml, findClosestP } from './helpers/handleNodes';

import {
  handleDragFunction,
  handleImageOnDrop,
  handleImageCaret,
  handleSeparateImage,
} from './helpers/handleImage';

const TinyMCEditor = () => {
  const editorRef = useRef(null);
  const maxCharacters = 500;
  const [dirty, setDirty] = useState(false);
  const [length, setLength] = useState(0);
  const [characterLength, setCharacterLength] = useState(0);

  const handleWordCount = (event, editor) => {
    const wordcount = editor.plugins.wordcount;
    const emptyContent = !!editor.getContent({ format: 'text' })?.trim();
    if (emptyContent) {
      setLength(wordcount.body.getCharacterCount());
      return;
    }
    setLength(0);
  };

  const handlePaste = (event, editor) => {
    // Preventing the default paste handling
    event.preventDefault();
    // clipboard text
    const paste = (event.clipboardData || window.clipboardData)
      .getData('text')
      .replace(/(<([^>]+)>)/gi, '');

    // Inserting the pasted text into the editor
    editor.insertContent(paste);
    handleWordCount(event, editor);
  };

  const handleDownInput = (event, editor) => {
    const keyCode = event?.keyCode || event?.which;

    //if the user has exceeded the max turn the path bar reditor.
    if (
      length >= maxCharacters &&
      !event?.metaKey &&
      !event?.altKey &&
      !event?.ctrlKey &&
      !event?.shiftKey &&
      !event?.key !== 'Backspace' &&
      ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57))
    ) {
      event?.preventDefault();
      event?.stopPropagation();

      // Allow the user to type characters
      editor.insertContent(event?.key);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const htmlContent = editor.getContent();
      const textContent = extractTextFromHtml(htmlContent);

      const interactWithModel = await fetch(
        'http://localhost:3000/api/customerSupport',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: textContent,
          }),
        }
      );

      const json = await interactWithModel.json();
      console.log(json);
    }
  };

  useEffect(() => {
    setCharacterLength(length);
    if (length === 0) {
      setDirty(false);
    } else {
      setDirty(true);
    }
  }, [length]);

  return (
    <>
      <Editor
        ref={editorRef}
        placeholder={'Add your comment'}
        apiKey={process.env.TINY_MCE_API_KEY}
        className={``}
        plugins={'link emoticons wordcount image'}
        init={{
          branding: false,
          menubar: false,
          toolbar: 'bold italic underline link emoticons image',
          height: 3000, //should be 150
          statusbar: false,
          link_title: false,
          link_target_list: false,
          link_default_target: '_blank',
          autoresize_bottom_margin: 10,
          entity_encoding: 'raw',
          auto_focus: true,
          content_style: `
						img { height: auto; max-width: 100%; object-fit: contain; margin-right: auto; }
						p img { caret-color: blue; }
						p {border: 1px solid red}
						`,
          setup: function (editor) {
            let prevPNode = null;
            // update character count on whenever content changes
            editor.on('SetContent', (e) => {
              const node = editor.selection.getNode();
              handleSeparateImage(node); // moves image to new p element whenever created
              handleWordCount(e, editor); // check length whenever anything changes
            });
            // NodeChange executes whenever the node selected in editor changes
            editor.on('NodeChange', (e) => {
              // determine cursor/caret position
              handleImageCaret(e, editor, prevPNode);
              prevPNode = findClosestP(editor.selection.getNode());
            });

            // check if user is about to remove the p with an image
            editor.on('keydown', function (event) {
              if (event.keyCode == 8 || event.keyCode == 46) {
                // 8: Backspace, 46: Delete
                const parent = findClosestP(editor.selection.getNode());
                let cursorPosition = editor.selection.getRng().startOffset;
                // Get current selection range
                let selectionRange = editor.selection.getRng();
                let isTextHighlighted =
                  selectionRange.startOffset !== selectionRange.endOffset;

                if (cursorPosition === 0 && parent?.previousSibling) {
                  if (isTextHighlighted) {
                    return;
                  }
                  const prevSibling = parent.previousSibling;
                  const imageNode = prevSibling.querySelector('img'); // Find an img element within the previousSibling
                  if (imageNode) {
                    // If there's an img element inside the previousSibling
                    editor.selection.select(imageNode); // Select the image node so it gets removed
                    // remove parent node if it's empty
                    if (parent.innerHTML === '<br>') {
                      parent.remove();
                    }
                  }
                }
              }
            });

            // DRAG AND DROP IMAGE
            let dragImage = null;
            editor.on('dragstart', () => {
              // const currentNode = editor.selection.getNode();
              // if (currentNode.nodeName === 'IMG') {
              //   e.preventDefault();
              //   return;
              // }

              const currentNode = editor.selection.getNode();
              if (currentNode.nodeName === 'IMG') {
                dragImage = currentNode.parentNode;
              }
            });
            // Add a drop event listener
            editor.on('drop', (e) => {
              // if (currentNode.nodeName === 'IMG') {
              //   e.preventDefault();
              //   return;
              // }
              // your function here
              setTimeout(() => {
                const currentNode = editor.selection.getNode();
                if (currentNode.nodeName === 'IMG') {
                  handleImageOnDrop(editor, currentNode, dragImage);
                  e.preventDefault();
                }

                dragImage = null; // Reset dragImage after drop is handled
              }, 0);
            });
          },
        }}
        initialValue={''}
        onKeyUp={handleWordCount}
        onKeyDown={handleDownInput}
        onPaste={handlePaste}
      />
      <p
        className={`border-2 ${
          length > maxCharacters && `border-2 border-red-500`
        }`}
      >
        {maxCharacters - length}
      </p>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default TinyMCEditor;
