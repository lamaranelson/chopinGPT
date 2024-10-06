'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatGPTContent from './ChatGPTContent';
import MessageInput from './MessageInput';

interface Message {
  sender: 'user' | 'ai';
  content: string;
}

const MainComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (message: string, sender: 'user' | 'ai') => {
    setMessages((prevMessages) => [...prevMessages, { sender, content: message }]);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto p-5">
            <ChatGPTContent messages={messages} />
          </div>
          <div className="p-5 border-t border-gray-300">
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;