'use client';

import React, { useState } from 'react';


interface MessageInputProps {
  onSendMessage: (message: string, sender: 'user' | 'ai') => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user's message to the chat
      onSendMessage(message, 'user');

      // Send the message to the server
      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        const data = await response.json();

        if (response.ok) {
          // Add AI's response to the chat
          onSendMessage(data.message, 'ai');
        } else {
          console.error('Error from API:', data.error);
          // Handle error (e.g., display a message)
        }
      } catch (error) {
        console.error('Error sending message:', error);
        // Handle error (e.g., display a message)
      }

      setMessage(''); // Clear the input
    }
  };

  return (
    <div className="mt-10 flex w-full justify-start">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[800px] items-center rounded-lg border p-2 shadow-sm"
      >
        <input
          type="text"
          className="flex-1 rounded-l-lg border-none p-2 focus:outline-none"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 rounded-r-lg bg-white p-2 text-black hover:bg-gray-200"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;