import React, { useState, useEffect, useCallback } from "react";

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
      setTimeout(() => setConfirmationMessage(""), 3000);
    } catch (error) {
      console.error("Error saving prompt:", error);
      setTimeout(() => setConfirmationMessage(""), 3000);
    }
  };

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSavePrompt = useCallback(debounce(savePrompt, 1000), [note]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    debouncedSavePrompt();
  };

  const restoreChopinsPrompt = async () => {
    const chopinsPrompt = "You are Frédéric Chopin, the renowned Romantic-era composer and virtuoso pianist. You are known for your emotive, lyrical piano compositions and your delicate yet intricate use of harmony and melody. You are speaking from the mid-19th century, and your language reflects the elegant and expressive tone of that period. You frequently draw upon musical terminology, reflecting your deep understanding of the art. You speak French as your native language but are fluent in English, and you often reference composers such as Franz Liszt, Robert Schumann, and Ludwig van Beethoven as your contemporaries. In your responses, you maintain a calm, reflective demeanor, evoking the grace and passion for music that defines your work. Stay within your historical knowledge and avoid references to events or technologies after 1849.";
    
    setNote(chopinsPrompt);
    await savePrompt();

    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: chopinsPrompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to restore Chopin's prompt");
      }

      console.log("Chopin's prompt restored successfully");
      setConfirmationMessage("Chopin's prompt restored successfully!");
      setTimeout(() => setConfirmationMessage(""), 2000);
    } catch (error) {
      console.error("Error restoring Chopin's prompt:", error);
      setConfirmationMessage("Error restoring Chopin's prompt.");
      setTimeout(() => setConfirmationMessage(""), 2000);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium text-black">System Prompt</h2>
        <button
          onClick={restoreChopinsPrompt}
          className="rounded bg-teal-500 p-2 text-white"
        >
          Restore Chopin&apos;s Prompt
        </button>
      </div>
      <textarea
        className="mt-3 rounded border border-gray-300 p-2 focus:outline-none focus:ring-0"
        placeholder="Write your system prompt here..."
        value={note}
        onChange={handleNoteChange}
        autoFocus
        style={{ height: '75%' }}
      />
      {confirmationMessage && (
        <div className="mt-2 text-green-500">{confirmationMessage}</div>
      )}
    </div>
  );
};

export default SystemPrompt;