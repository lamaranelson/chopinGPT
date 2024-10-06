import React from 'react';

interface Message {
  sender: 'user' | 'ai';
  content: string;
}

interface ChatGPTContentProps {
  messages: Message[];
}

const ChatGPTContent: React.FC<ChatGPTContentProps> = ({ messages }) => {
  return (
    <div className="flex flex-col mt-20 max-w-full w-[800px] max-md:mt-10">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl font-semibold text-black">Chopin Resurrected</h1>
        <div className="mt-3 text-base leading-none text-neutral-400">Ver 0.1 Oct 22</div>
      </div>
      <div className="mt-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded mb-2 ${
              message.sender === 'user' ? 'bg-gray-100 text-left' : 'bg-blue-100 text-right'
            }`}
          >
            <span className="font-semibold">
              {message.sender === 'user' ? 'You: ' : 'ChopinGPT: '}
            </span>
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatGPTContent;