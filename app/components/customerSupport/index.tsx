'use client';
import { useState, useEffect } from 'react';
import { BiChat } from 'react-icons/bi';
import { usePathname, useSearchParams } from 'next/navigation';
import Conversation from './Conversation';
import TinyMCEditor from './TinyMCE';

const ChatBox = () => {
  return (
    <div className="absolute bottom-0 right-0 flex flex-col justify-end w-full h-full max-w-sm transition-all duration-500 bg-gray-700 border-2">
      Chatbox
      <Conversation />
      <TinyMCEditor />
    </div>
  );
};

const CustomerSupport = () => {
  const [toggleChat, setToggleChat] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // close chat box when user navigates to a different page
  useEffect(() => {
    setToggleChat(false);
  }, [pathname, searchParams]);

  const handleWindowClick = () => {
    setToggleChat(false);
  };

  useEffect(() => {
    // When the component mounts, it starts listening for clicks anywhere in the window
    window.addEventListener('click', handleWindowClick);

    return () => {
      // When the component unmounts, it stops listening for clicks
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const handleChatButtonClick = (e: { stopPropagation: () => void }) => {
    // This stops the click event from reaching the window, so the chatbox won't be hidden immediately after being shown
    e.stopPropagation();
    setToggleChat(!toggleChat);
  };

  return (
    <>
      {toggleChat && (
        <div
          onClick={(e) => e.stopPropagation()} // This stops clicks inside the chat box from reaching the window
          className="fixed bottom-0 right-0 z-10 w-full h-full max-w-sm transition-all duration-500 origin-bottom transform scale-y-100 opacity-100 pointer-events-auto"
        >
          <ChatBox />
        </div>
      )}
      <button
        className="fixed bottom-0 right-0 z-20 m-4"
        onClick={handleChatButtonClick}
      >
        <BiChat size={32} color="#bbb" />
      </button>
    </>
  );
};

export default CustomerSupport;
