import React, { useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  sender: "user" | "ai";
  content: string;
}

interface ChatGPTContentProps {
  messages: Message[];
}

const ChatGPTContent: React.FC<ChatGPTContentProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 100;

    if (isNearBottom) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  return (
    <div
      className="mt-2 flex w-full max-w-full flex-col max-md:mt-10"
      ref={containerRef}
    >
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
            className={`mb-2 max-w-[100%] rounded p-4 ${
              message.sender === "user"
                ? "self-start bg-gray-100 text-left"
                : "self-end bg-blue-100 text-left"
            }`}
          >
            <span className="mr-1 font-semibold">
              {message.sender === "user" ? "You: " : "ChopinGPT: "}
            </span>
            <ReactMarkdown className="font-normal" remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatGPTContent;
