"use client";

import Board from "@components/wordle/Board";
import Keyboard from "@components/wordle/Keyboard";
import { useWordleStore } from "@stores/useWordleStore";
import Link from "next/link";

const Wordle = () => {
  const {
    letterCount,
    guessCount,
    guesses,
    currentGuess,
    answer,
    setCurrentGuess,
    submitGuess,
  } = useWordleStore();

  return (
    <div className="">
      <nav style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link href="/games/wordle/settings">Settings</Link>
      </nav>
      <div>Testing - Answer is: {answer}</div>
      <div>
        <Board
          guessCount={guessCount}
          letterCount={letterCount}
          guesses={guesses}
          currentGuess={currentGuess}
          answer={answer}
        />
        <Keyboard></Keyboard>
      </div>
      <div>
        <div>
          <label>Guess:</label>
          <input
            id="guess"
            type="text"
            maxLength={letterCount}
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitGuess();
              }
            }}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Wordle;
