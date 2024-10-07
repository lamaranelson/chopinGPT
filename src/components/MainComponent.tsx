'use client';

import React, { useState } from 'react';
import Sidebar from 'src/components/Sidebar';
import Header from 'src/components/Header';
import ChatGPTContent from 'src/components/ChatGPTContent';
import SystemPrompt from 'src/components/SystemPrompt';
import MessageInput from 'src/components/MessageInput';

interface Message {
  sender: 'user' | 'ai';
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
  const [selectedMode, setSelectedMode] = useState<string>('Balanced mode');
  const [selectedModel, setSelectedModel] = useState<Model>({
    displayName: 'GPT 4 Turbo',
    apiName: 'gpt-4-turbo',
  });

  const handleSendMessage = async (newMessage: string, sender: 'user' | 'ai') => {
    const newMsg: Message = { sender, content: newMessage };
    // Update the messages array
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    if (sender === 'user') {
      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages, 
            mode: selectedMode,
            model: selectedModel.apiName,
          }),
        });

        const jsonResponse: unknown = await response.json();

        const isApiResponse = (data: unknown): data is ApiResponse => {
          return (
            typeof data === 'object' &&
            data !== null &&
            ('message' in data || 'error' in data)
          );
        };

        if (isApiResponse(jsonResponse)) {
          const data = jsonResponse;

          if (response.ok && data.message) {
            const aiMessage: Message = { sender: 'ai', content: data.message };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);

            // Fetch audio and play
            // try {
            //   const ttsResponse = await fetch('/api/elevenlabs', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'audio/mpeg' },
            //     body: JSON.stringify({ text: data.message }),
            //   });

            //   if (ttsResponse.ok) {
            //     const audioData = await ttsResponse.blob();
            //     const audioUrl = URL.createObjectURL(audioData);
              
            //     const audio = new Audio(audioUrl);
            //     audio.play().catch((error) => {
            //       console.error('Error playing audio:', error);
            //     });
              
            //     audio.onended = () => {
            //       URL.revokeObjectURL(audioUrl);
            //     };
            //   } else {
            //     console.error('Error fetching audio data for TTS');
            //   }
            // } catch (error) {
            //   console.error('Error in TTS:', error);
            // }
          } else {
            console.error('Error from API:', data.error);
          }
        } else {
          console.error('Invalid response format');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
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
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
        <div className="w-1/4 p-4 border-l border-gray-300 flex flex-col mt-20">
          <SystemPrompt />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;