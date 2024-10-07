import React, { useState, useEffect } from 'react';

const SystemPrompt: React.FC = () => {
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch('/api/prompt', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNote(data.prompt || '');
        } else {
          console.error('Failed to fetch prompt');
        }
      } catch (error) {
        console.error('Error fetching prompt:', error);
      }
    };

    fetchPrompt();
  }, []);

  const savePrompt = async () => {
    try {
      const response = await fetch('/api/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: note }), // Ensure note is not empty
      });

      if (!response.ok) {
        throw new Error('Failed to save prompt');
      }

      console.log('Prompt saved successfully');
    } catch (error) {
      console.error('Error saving prompt:', error);
    }
  };

  return (
    <div className="flex flex-col h-full mt-4">
      <h2 className="text-lg font-semibold mb-2">System Prompt</h2>
      <textarea
        className="flex-1 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-0"
        placeholder="Write your system prompt here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        autoFocus
      />
      <button onClick={savePrompt} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Save Prompt
      </button>
    </div>
  );
};

export default SystemPrompt;