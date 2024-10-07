import React, { useEffect, useRef } from "react";

interface Message {
  sender: "user" | "ai";
  content: string;
}

interface ChatGPTContentProps {
  messages: Message[];
}

const ChatGPTContent: React.FC<ChatGPTContentProps> = ({ messages }) => {
  // Create a reference to the end of the messages list
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mt-2 flex w-full max-w-full flex-col max-md:mt-10">
      <div className="flex w-full flex-col items-center">
        <h1 className="text-4xl font-semibold text-black">
          Chopin Resurrected
        </h1>
        <div className="mt-2 text-base leading-none text-neutral-400">
          Ver 1.1 Oct 06
        </div>
      </div>
      <div className="mt-5">
        {messages.map((message, index) => (
          <div
          key={index}
          className={`mb-2 rounded p-4 max-w-[100%] ${
            message.sender === "user"
              ? "bg-gray-100 text-left self-start"
              : "bg-blue-100 text-left self-end"
          }`}
        >
          <span className="font-semibold mr-1">
            {message.sender === "user" ? "You: " : "ChopinGPT: "}<span className="font-normal">{message.content}</span>
          </span>
        </div>
        ))}
        {/* Add a dummy div to act as the bottom anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatGPTContent;
