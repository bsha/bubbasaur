"use client";

import { wordleWordService } from "@/lib/wordleWordService";
import Board from "@components/wordle/Board";
import Keyboard from "@components/wordle/Keyboard";
import { useWordleStore } from "@stores/useWordleStore";
import Link from "next/link";
import { useCallback, useEffect } from "react";

const Wordle = () => {
  const {
    status,
    letterCount,
    guessCount,
    guesses,
    currentGuess,
    answer,
    addToGuess,
    removeFromGuess,
    submitGuess,
    startGame,
  } = useWordleStore();

  const onStartGame = useCallback(async () => {
    const newAnswer = await wordleWordService.getWordByLength(letterCount);
    startGame({ answer: newAnswer, guessCount });
  }, [guessCount, letterCount, startGame]);

  useEffect(() => {
    if (!answer) {
      onStartGame();
    }
  }, [onStartGame]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (status !== "playing") {
        return;
      }
      if (event.key.length === 1 && /^[A-Za-z]+$/.test(event.key)) {
        addToGuess(event.key);
      } else if (event.key === "Backspace") {
        removeFromGuess();
      } else if (event.key === "Enter") {
        submitGuess();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [status, addToGuess, onStartGame, removeFromGuess, submitGuess]);

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Wordle</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Play Wordle</h1>
          </div>

          <Link
            href="/games/wordle/settings"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Settings
          </Link>
        </header>

        <section aria-labelledby="wordle-game-heading" className="grid gap-6">
          <div>
            <h2 id="wordle-game-heading" className="sr-only">
              Wordle game board
            </h2>
            <Board
              guessCount={guessCount}
              letterCount={letterCount}
              guesses={guesses}
              currentGuess={currentGuess}
              answer={answer}
            />
          </div>

          <div className="grid gap-4">
            <Keyboard />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Wordle;
