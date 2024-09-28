'use client';

import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage(''); // Clear the input after sending the message
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full">
      <form onSubmit={handleSubmit} className="flex items-center w-full max-w-2xl p-2 border rounded-lg shadow-sm">
        <input
          type="text"
          className="flex-1 p-2 border-none rounded-l-lg focus:outline-none"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="ml-2 p-2 bg-white text-black rounded-r-lg hover:bg-gray-200">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;