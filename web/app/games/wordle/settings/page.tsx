"use client";

import { useWordleStore } from "@/stores/useWordleStore";
import Link from "next/link";
import { useState } from "react";

type Mode = "letterCount" | "customAnswer";

export default function Page() {
  const {
    letterCount,
    guessCount,
    answer,
    setLetterCount,
    setGuessCount,
    setAnswer,
    startGame,
  } = useWordleStore();

  const [mode, setMode] = useState<Mode>("letterCount");
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
        <Link href="/games/wordle" onClick={startGame}>
          Start Game
        </Link>
      </nav>
    </div>
  );
}
