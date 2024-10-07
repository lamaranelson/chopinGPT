import React, { useState, useEffect } from "react";

interface PromptResponse {
  prompt: string;
}

const SystemPrompt: React.FC = () => {
  const [note, setNote] = useState<string>("");

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
    } catch (error) {
      console.error("Error saving prompt:", error);
    }
  };

  return (
    <div className="mt-4 flex h-full flex-col">
      <h2 className="mb-2 text-lg font-semibold">System Prompt</h2>
      <textarea
        className="flex-1 resize-none rounded border border-gray-300 p-2 focus:outline-none focus:ring-0"
        placeholder="Write your system prompt here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        autoFocus
      />
      <button
        onClick={savePrompt}
        className="mt-2 rounded bg-blue-500 p-2 text-white"
      >
        Save Prompt
      </button>
    </div>
  );
};

export default SystemPrompt;
