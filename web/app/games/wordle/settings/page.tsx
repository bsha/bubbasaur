"use client";

import { useWordleStore } from "@/stores/useWordleStore";
import Link from "next/link";

export default function Page() {
  const { letterCount, guessCount, setLetterCount, setGuessCount, startGame } =
    useWordleStore();
  return (
    <div>
      Settings page
      <div>
        <div>
          <label>Enter number of letters:</label>
          <input
            min="1"
            max="9"
            id="letterCount"
            type="number"
            value={letterCount}
            onChange={(x) => setLetterCount(parseInt(x.target.value))}
          ></input>
        </div>
        <div>
          <label>Enter number of guesses allowed:</label>
          <input
            id="guessCount"
            type="number"
            value={guessCount}
            onChange={(x) => setGuessCount(parseInt(x.target.value))}
          ></input>
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
