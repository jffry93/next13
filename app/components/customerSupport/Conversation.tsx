import React from 'react';

const messages = [
  'Hi, how can I help you?',
  'What is your name?',
  'What is your email?',
  'What is your phone number?',
  'What is your question?',
  'Thank you for your question. We will get back to you as soon as possible.',
];

const Conversation = () => {
  return (
    <div className="flex flex-col justify-end h-full border-2 border-purple-700">
      {messages.map((message, index) => {
        return <div key={index}>{message}</div>;
      })}
    </div>
  );
};

export default Conversation;
