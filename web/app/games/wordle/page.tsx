"use client";

import { wordleWordService } from "@/lib/wordleWordService";
import Board from "@components/wordle/Board";
import Keyboard from "@components/wordle/Keyboard";
import { useWordleStore } from "@stores/useWordleStore";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { toast } from "@components/ui/toast";
import { Button } from "@/components/ui/button";
import router from "next/router";

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
  }, [answer, onStartGame]);

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

  useEffect(() => {
    if (status === "won") {
      const id = toast.add({
        title: "You won!",
        description: "Play again!",
        actionProps: {
          children: "Play again",
          onClick() {
            toast.close(id);
            onStartGame();
          },
        },
      });
    } else if (status === "lost") {
      const id = toast.add({
        title: "Game over",
        description: `The word was ${answer}. Try again next time!`,
        actionProps: {
          children: "Try again",
          onClick() {
            toast.close(id);
            onStartGame();
          },
        },
      });
    }
  }, [status, answer, onStartGame]);

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="flex flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Wordle</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Play Wordle</h1>
          </div>
          <div className="flex flex-row gap-4">
            <Button variant="outline" onClick={onStartGame}>
              New Game
            </Button>
            <Button variant="outline">
              <Link href="/games/wordle/settings">Settings</Link>
            </Button>
          </div>
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
