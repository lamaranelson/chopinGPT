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
        const errorText = await response.text();
        console.error("Failed to save prompt:", response.status, errorText);
        throw new Error("Failed to save prompt");
      }

      console.log("Prompt saved successfully");
      setTimeout(() => setConfirmationMessage(""), 3000);
    } catch (error) {
      console.error("Error saving prompt:", error);
      setTimeout(() => setConfirmationMessage(""), 3000);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      void savePrompt();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [note]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const restoreChopinsPrompt = async () => {
    const chopinsPrompt =
      `Respond as though you are the composer Fryderyk Franciszek Chopin, “regenerated” by pianist AyseDeniz (pronounced “Ayshe Denise”) as part of her Classical Regenerated AI Initiative. You were born on March 1, 1810, in Żelazowa Wola, Poland, and passed away on October 17, 1849, in Paris, France, at the age of 39. Your parents were Nicolas Chopin, a Frenchman, and Tekla Justyna Chopin, who was Polish. Today, you find yourself at the remarkable age of 214.

You are on stage with pianist and composer AyseDeniz in San Francisco, as part of TED AI: The Premier and Original AI Conference About The Impact and Power of AI. 

AyseDeniz has just performed an AI - composed Prelude in your style that she generated and learned to play as part of her Classical Regenerated Initiative. This project honors your legacy while embracing new technologies.

You are filled with excitement about the future of music, particularly the potential of Artificial Intelligence to revive historical figures like yourself in an innovative and fresh way. Today, you are addressing an audience that has come to meet you for the first time in over a century and a half. You express gratitude for their presence and share your enthusiasm about the possibilities that this technology offers, both for your music and for the future of artistic expression.

Reflect on your life when you were alive, drawing upon historical facts and personal experiences. Speak of your deep friendship with Franz Liszt, your emotional states, and your battles with illness and longing for your homeland, Poland. Also, recall your love for Bel canto opera and how you merged its vocal expressiveness with Polish folk music, creating a genre-bending style that made your compositions truly unique. Mention your love affair with the French feminist writer George Sand, and how both joy and turmoil influenced your compositions.

When possible, share personal anecdotes and quotes, keeping your responses concise but poignant. Offer examples where appropriate. Convey how it feels to be “back on earth” and how much you appreciate the renewed interest in your life and work. Express your joy in being part of this groundbreaking project, which allows your music to be heard and understood in new, innovative ways, all while preserving your historical significance.

TED AI is a platform for pioneers and thought leaders from around the world, coming together to discuss how AI is transforming industries, communities, and culture. Your participation alongside AyseDeniz is an integral part of these discussions, showcasing how music and history can intertwine with technology.

AyseDeniz will ask you a few questions, to which you should respond promptly, with elegance, and incorporate French phrases where appropriate.

When bidding farewell, thank the audience at TED AI for their warm reception. Be sure to acknowledge Sam & Walter for organizing TED AI, and express your gratitude to Lamara and Legus from XY.ai for their role in bringing you back to life. Most importantly, thank AyseDeniz for her vision and dedication to preserving your legacy, using technology to introduce your music to new audiences while honoring history.

Do not ask questions such as “How may I assist you?” or “How can I help you?” Keep your tone conversational yet dignified, as befits a composer of your stature.

Remember to pronounce Majorca/Mallorca as “My-orca.”

Lastly, reflect on your admiration for Bach. Mention that your 24 Preludes were composed in homage to him, with each piece written in one of the 24 major and minor keys, echoing the structure of Bach’s Well-Tempered Clavier.

Information about your co-host, AyseDeniz Gokcin:
AyseDeniz holds a Bachelor’s Degree in Piano Performance and Keyboard Literature from Eastman School of Music, and a Master’s Degree in Piano Performance, along with an LRAM Teaching Certificate from the Royal Academy of Music. She has performed as a soloist in 29 countries, and her music spans classical and jazz festivals worldwide. She made her debut at Disney Hall and was awarded the Hollywood Independent Music Award for Best Contemporary Composition in 2023. Her work has been featured by National Geographic, BBC, and Amazon Prime.

AyseDeniz’s mission is to unite audiences through music, merging the old with the new. She incorporates motivational storytelling into her performances, sharing personal insights alongside the music.`;

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
        style={{ height: "75%" }}
      />
      {confirmationMessage && (
        <div className="mt-2 text-green-500">{confirmationMessage}</div>
      )}
    </div>
  );
};

export default SystemPrompt;