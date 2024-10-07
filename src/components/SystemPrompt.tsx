import React, { useState, useEffect } from "react";

interface PromptResponse {
  prompt: string;
}

const SystemPrompt: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch("/api/prompt", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = (await response.json()) as PromptResponse;
          setNote(data.prompt || "");
        } else {
          console.error("Failed to fetch prompt");
        }
      } catch (error) {
        console.error("Error fetching prompt:", error);
      }
    };

    void fetchPrompt();
  }, []);

  const savePrompt = async () => {
    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: note }),
      });

      if (!response.ok) {
        throw new Error("Failed to save prompt");
      }

      console.log("Prompt saved successfully");
      setConfirmationMessage("Prompt saved successfully!"); 
      setTimeout(() => setConfirmationMessage(""), 3000); 
    } catch (error) {
      console.error("Error saving prompt:", error);
      setConfirmationMessage("Error saving prompt."); 
      setTimeout(() => setConfirmationMessage(""), 3000);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <h2 className="text-2xl font-medium text-black">System Prompt</h2>
      <textarea
        className="mt-3 rounded border border-gray-300 p-2 focus:outline-none focus:ring-0"
        placeholder="Write your system prompt here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        autoFocus
        style={{ height: '75%' }}
      />
      <button
        onClick={savePrompt}
        className="mt-3 rounded bg-blue-500 p-2 text-white"
      >
        Save Prompt
      </button>
      {confirmationMessage && (
        <div className="mt-2 text-green-500">{confirmationMessage}</div>
      )}
    </div>
  );
};

export default SystemPrompt;
