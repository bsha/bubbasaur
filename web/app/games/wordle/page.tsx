"use client";

import Board from "@components/wordle/Board";
import Keyboard from "@components/wordle/Keyboard";
import { useWordleStore } from "@stores/useWordleStore";
import Link from "next/link";
import { type KeyboardEvent } from "react";

const Wordle = () => {
  const { letterCount, guessCount } = useWordleStore();
  const onGuess = (_: KeyboardEvent) => {};

  return (
    <div className="">
      <nav style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link href="/games/wordle/settings">Settings</Link>
      </nav>
      <div>
        <Board guessCount={guessCount} letterCount={letterCount} />
        <Keyboard></Keyboard>
      </div>
      <div>
        <div>
          <label>Guess:</label>
          <input
            id="guess"
            type="text"
            maxLength={5}
            onKeyDown={onGuess}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Wordle;
