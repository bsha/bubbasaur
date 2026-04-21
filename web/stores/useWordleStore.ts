import { create } from "zustand";

type GameStatus = "idle" | "playing" | "won" | "lost";

type WordleStore = {
  // user-configurable settings
  letterCount: number;
  guessCount: number;

  // active game state
  guesses: string[];
  currentGuess: string;
  status: GameStatus;

  // settings actions
  setLetterCount: (count: number) => void;
  setGuessCount: (count: number) => void;

  // gameplay actions
  setCurrentGuess: (guess: string) => void;
  submitGuess: (guess: string) => void;
  resetGame: () => void;
  startGame: () => void;
};

export const useWordleStore = create<WordleStore>((set, get) => ({
  letterCount: 5,
  guessCount: 6,

  guesses: [],
  currentGuess: "",
  status: "idle",

  setLetterCount: (count) =>
    set({
      letterCount: count,
      guesses: [],
      status: "idle",
    }),

  setGuessCount: (count) =>
    set({
      guessCount: count,
      guesses: [],
      status: "idle",
    }),

  setCurrentGuess: (guess) => {
    const { letterCount } = get();
    set({ currentGuess: guess.slice(0, letterCount).toUpperCase() });
  },

  submitGuess: () => {
    const { currentGuess, guesses, guessCount, letterCount, status } = get();

    if (status === "won" || status === "lost") return;
    if (currentGuess.length !== letterCount) return;
    if (guesses.length >= guessCount) return;

    const nextGuesses = [...guesses, currentGuess];
    const hasUsedAllGuesses = nextGuesses.length >= guessCount;

    set({
      guesses: nextGuesses,
      currentGuess: "",
      status: hasUsedAllGuesses ? "lost" : "playing",
    });
  },

  resetGame: () =>
    set({
      guesses: [],
      currentGuess: "",
      status: "idle",
    }),

  startGame: () =>
    set({
      guesses: [],
      currentGuess: "",
      status: "playing",
    }),
}));
