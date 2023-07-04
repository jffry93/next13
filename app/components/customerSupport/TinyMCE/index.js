'use client';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { findClosestP } from './helpers/searchNodes';

import {
  handleDragFunction,
  handlePreventCursor,
  handleSeparateImage,
} from './helpers/handleImage';

const TinyMCEditor = () => {
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
        placeholder={'Add your comment'}
        apiKey={process.env.TINY_MCE_API_KEY}
        className={``}
        plugins={'link emoticons wordcount image'}
        init={{
          branding: false,
          menubar: false,
          toolbar: 'bold italic underline link emoticons image',
          height: 550, //should be 150
          statusbar: false,
          link_title: false,
          link_target_list: false,
          link_default_target: '_blank',
          autoresize_bottom_margin: 10,
          entity_encoding: 'raw',
          auto_focus: true,
          content_style: `
						img { height: auto; max-width: 100%; object-fit: contain; margin-right: auto; }
						p img { ; caret-color: transparent; }
						`,
          setup: function (editor) {
            let prevPNode = null;

            // update character count on whenever content changes
            editor.on('SetContent', (e) => {
              // console.log('SetContent 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
              const node = editor.selection.getNode();
              handleSeparateImage(node); // moves image to new p element whenever created
              handleWordCount(e, editor); // check length whenever anything changes
            });
            // NodeChange executes whenever the node selected in editor changes
            editor.on('NodeChange', (e) => {
              // console.log('NodeChange 🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊');
              handlePreventCursor(e, editor, prevPNode);
              prevPNode = findClosestP(editor.selection.getNode());
            });

            let dragImage = null;
            editor.on('dragstart', () => {
              const currentNode = editor.selection.getNode();
              if (currentNode.nodeName === 'IMG') {
                dragImage = currentNode.parentNode;
                console.log(
                  'dragImage 🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃',
                  currentNode.parentNode
                );
              }

              // console.log('dragstart ��', currentNode.parentNode);
            });
            // Add a drop event listener
            editor.on('drop', () => {
              // your function here
              setTimeout(() => {
                const currentNode = editor.selection.getNode();
                if (currentNode.nodeName === 'IMG') {
                  console.log(
                    'dragImage 🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃🍃',
                    dragImage
                  );
                  console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
                  handleDragFunction(currentNode, dragImage);
                }
                dragImage = null; // Reset dragImage after drop is handled
              }, 0);
            });
          },
        }}
        initialValue={''}
        // onKeyUp={handleWordCount}
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
    </>
  );
};

export default TinyMCEditor;
