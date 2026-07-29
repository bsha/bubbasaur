import { create } from "zustand";

type GameStatus = "idle" | "playing" | "won" | "lost";

type WordleStore = {
  // user-configurable settings
  letterCount: number;
  guessCount: number;
  answer: string;

  // active game state
  guesses: string[];
  currentGuess: string;
  status: GameStatus;

  // gameplay actions
  setCurrentGuess: (guess: string) => void;
  submitGuess: () => void;
  resetGame: () => void;
  startGame: ({
    answer,
    guessCount,
  }: {
    answer: string;
    guessCount: number;
  }) => void;
};

export const useWordleStore = create<WordleStore>((set, get) => ({
  letterCount: 5,
  guessCount: 6,
  answer: "",

  guesses: [],
  currentGuess: "",
  status: "idle",

  setCurrentGuess: (guess) => {
    const { letterCount } = get();
    set({ currentGuess: guess.slice(0, letterCount).toUpperCase() });
  },

  submitGuess: () => {
    const { currentGuess, guesses, guessCount, letterCount, status, answer } =
      get();

    if (status === "won" || status === "lost") return;
    if (currentGuess.length !== letterCount) return;
    if (guesses.length >= guessCount) return;

    const nextGuesses = [...guesses, currentGuess];
    const hasUsedAllGuesses = nextGuesses.length >= guessCount;
    const isCorrect =
      answer && nextGuesses[nextGuesses.length - 1] === answer.toUpperCase();

    set({
      guesses: nextGuesses,
      currentGuess: "",
      status: isCorrect ? "won" : hasUsedAllGuesses ? "lost" : "playing",
    });
  },

  resetGame: () =>
    set({
      guesses: [],
      currentGuess: "",
      status: "idle",
    }),

  startGame: ({ answer, guessCount }: { answer: string; guessCount: number }) =>
    set({
      answer,
      letterCount: answer.length,
      guessCount,
      guesses: [],
      currentGuess: "",
      status: "playing",
    }),
}));
