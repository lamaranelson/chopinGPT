"use client";

import React, { useState } from "react";
import { PaperAirplaneIcon, StopIcon } from "@heroicons/react/24/solid";

interface MessageInputProps {
  onSendMessage: (message: string, sender: "user" | "ai") => void;
  isPlaying: boolean;
  stopAudio: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isPlaying, stopAudio }) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, "user");
      setMessage("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleButtonClick = () => {
    if (message.trim()) {
      onSendMessage(message, "user");
      setMessage("");
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
          onChange={handleChange}
        />
        <button
          type="button"
          className="ml-2 rounded-r-lg bg-white p-2 text-black hover:bg-gray-200"
          onClick={isPlaying ? stopAudio : handleButtonClick}
        >
          {isPlaying ? (
            <StopIcon className="h-5 w-5 text-red-500" />
          ) : (
            <PaperAirplaneIcon className="h-5 w-5 transform rotate-100 text-gray-500" />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;