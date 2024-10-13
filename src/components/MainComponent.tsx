"use client";

import React, { useRef, useState } from "react";
import Sidebar from "src/components/Sidebar";
import Header from "src/components/Header";
import ChatGPTContent from "src/components/ChatGPTContent";
import SystemPrompt from "src/components/SystemPrompt";
import MessageInput from "src/components/MessageInput";

interface Message {
  sender: "user" | "ai";
  content: string;
}

interface Model {
  displayName: string;
  apiName: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
}

const MainComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMode, setSelectedMode] = useState<string>("Balanced mode");
  const [selectedModel, setSelectedModel] = useState<Model>({
    displayName: "GPT 4 Turbo",
    apiName: "gpt-4-turbo",
  });
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const abortController = useRef<AbortController | null>(null);

  const initiateOpenAIStream = async (currentMessage: string) => {
    // Abort any ongoing requests
    abortController.current?.abort();
    abortController.current = new AbortController();

    const newMsg: Message = { sender: "user", content: currentMessage };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    const url = new URL(window.location.origin + "/api/openai");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: updatedMessages,
        mode: selectedMode,
        model: selectedModel.apiName,
      }),
      signal: abortController.current.signal,
    });

    console.log("Response from OpenAI stream:", response);
    return response;
  };

  const getGPTResponse = async (currentMessage: string) => {
    const response = await initiateOpenAIStream(currentMessage);
    if (!response.body) {
      throw new Error("No response body");
    }
    const data = response.body;

    if (!data) {
      throw new Error("No data");
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    const accumulatedChunks: string[] = [];

    while (true) {
      const { value, done: doneReading } = await reader.read();
      if (doneReading) {
        const fullText = accumulatedChunks.join("");
        await convertTextToSpeech(fullText);
        break;
      }
      const chunkValue = decoder.decode(value);

      // Handle potential multiple chunks separated by newlines
      const chunks = chunkValue.includes("\n\n")
        ? chunkValue.split("\n\n").flatMap((chunk) => chunk.split("\n"))
        : chunkValue.split("\n");

      for (const chunk of chunks) {
        let processedChunk = chunk.replaceAll("0:", ""); // Remove "0:" from the string

        processedChunk = processedChunk
          .replace(/^"/, "") // Remove the double quote at the start
          .replace(/(?<!\\)"$/, ""); // Remove the double quote at the end only if not preceded by a backslash

        // Unescape any escaped characters in the chunk
        processedChunk = processedChunk
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t")
          .replace(/\\r/g, "\r")
          .replace(/\\\\"/g, '"');

        accumulatedChunks.push(processedChunk);

        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.sender === "ai") {
            // Append to the last AI message
            const updatedLastMessage = {
              ...lastMessage,
              content: lastMessage.content + processedChunk,
            };
            return [...prevMessages.slice(0, -1), updatedLastMessage];
          } else {
            // Add a new AI message
            const newMessage: Message = {
              sender: "ai",
              content: processedChunk,
            };
            return [...prevMessages, newMessage];
          }
        });
      }
    }
  };

  const convertTextToSpeech = async (text: string) => {
    const response = await fetch("/api/elevenlabs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
      signal: abortController.current?.signal,
    });

    if (!response.ok) {
      throw new Error("Failed to convert text to speech");
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const newAudio = new Audio(audioUrl);

    const playPromise = newAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("Error playing audio:", error);
      });
    }

    setAudio(newAudio);
    setIsPlaying(true);

    newAudio.onended = () => {
      setIsPlaying(false);
    };
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };
  const handleSendMessage = async (
    newMessage: string,
    sender: "user" | "ai",
  ) => {
    if (sender === "user") {
      stopAudio(); // Stop any playing audio
      try {
        await getGPTResponse(newMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <Header />
      <div className="flex flex-1 overflow-scroll">
        <Sidebar
          selectedMode={selectedMode}
          onModeSelect={setSelectedMode}
          selectedModel={selectedModel}
          onModelSelect={setSelectedModel}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-4">
            <ChatGPTContent messages={messages} />
          </div>
          <div className="p-4">
            <MessageInput
              onSendMessage={handleSendMessage}
              isPlaying={isPlaying}
              stopAudio={stopAudio}
            />
          </div>
        </div>
        <div className="flex h-screen w-1/4 flex-col border-l border-gray-300 p-4">
          <SystemPrompt />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
