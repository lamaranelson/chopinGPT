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
    <div className="mt-20 flex w-[800px] max-w-full flex-col max-md:mt-10">
      <div className="flex w-full flex-col items-center">
        <h1 className="text-4xl font-semibold text-black">
          Chopin Resurrected
        </h1>
        <div className="mt-3 text-base leading-none text-neutral-400">
          Ver 0.1 Oct 22
        </div>
      </div>
      <div className="mt-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 rounded p-2 ${
              message.sender === "user"
                ? "bg-gray-100 text-left"
                : "bg-blue-100 text-right"
            } flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}
          >
            <span className="font-semibold">
              {message.sender === "user" ? "You: " : "ChopinGPT: "}
            </span>
            {message.content}
          </div>
        ))}
        {/* Add a dummy div to act as the bottom anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatGPTContent;
