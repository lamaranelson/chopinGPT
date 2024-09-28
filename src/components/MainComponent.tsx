import React from 'react';
import Sidebar from 'src/components/Sidebar';
import Header from 'src/components/Header';
import ChatGPTContent from 'src/components/ChatGPTContent';
import MessageInput from 'src/components/MessageInput';

const MainComponent: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto p-5">
            <ChatGPTContent />
          </div>
          <div className="p-5 border-t border-gray-300">
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;