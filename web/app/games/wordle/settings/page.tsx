"use client";

import { useWordleStore } from "@/stores/useWordleStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Mode = "letterCount" | "customAnswer";

interface GameResponse {
  id: string;
  difficulty: number;
  answer: string;
  guesses: string[];
  attemptsLeft: number;
  status: string;
}

export default function Page() {
  const { startGame } = useWordleStore();

  const [mode, setMode] = useState<Mode>("letterCount");
  const [letterCount, setLetterCount] = useState<number>(5);
  const [guessCount, setGuessCount] = useState<number>(6);
  const [answer, setAnswer] = useState<string>("");
  const router = useRouter();

  const handleStartGame = async () => {
    if (mode === "letterCount") {
      try {
        const response = await fetch("http://localhost:8080/games", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wordLength: letterCount,
            numberOfTries: guessCount,
          }),
        });

        if (response.ok) {
          const gameData: GameResponse = await response.json();
          setAnswer(gameData.answer);
          startGame(gameData.id, gameData.answer, gameData.attemptsLeft);
          router.push("/games/wordle");
        } else {
          console.error("Failed to start game:", response.statusText);
        }
      } catch (error) {
        console.error("Error starting game:", error);
      }
    } else {
      // customAnswer mode
      const gameId = crypto.randomUUID();
      startGame(gameId, answer, guessCount);
      router.push("/games/wordle");
    }
  };

  return (
    <div>
      Settings page
      <div>
        <div>
          <label>
            <input
              type="radio"
              name="mode"
              value="letterCount"
              checked={mode === "letterCount"}
              onChange={() => setMode("letterCount")}
            />
            Set number of letters
          </label>
          {mode === "letterCount" && (
            <input
              id="letterCount"
              min="1"
              max="9"
              type="number"
              value={letterCount}
              onChange={(x) => setLetterCount(parseInt(x.target.value))}
            />
          )}
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="mode"
              value="customAnswer"
              checked={mode === "customAnswer"}
              onChange={() => setMode("customAnswer")}
            />
            Enter custom word
          </label>
          {mode === "customAnswer" && (
            <input
              id="answer"
              type="text"
              value={answer}
              onChange={(x) => setAnswer(x.target.value.toUpperCase())}
              placeholder="Enter word to use as answer"
            />
          )}
        </div>
        <div>
          <label>Set number of guesses allowed:</label>
          <input
            id="guessCount"
            min="1"
            max="20"
            type="number"
            value={guessCount}
            onChange={(x) => setGuessCount(parseInt(x.target.value))}
          />
        </div>
      </div>
      <nav style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={handleStartGame}>Start Game</button>
      </nav>
    </div>
  );
}
