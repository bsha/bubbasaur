import { create } from "zustand";

type GameStatus = "idle" | "playing" | "won" | "lost";

const priority: Record<LetterState, number> = {
  empty: 0,
  absent: 1,
  present: 2,
  correct: 3,
};

type WordleStore = {
  // user-configurable settings
  letterCount: number;
  guessCount: number;
  answer: string;

  // active game state
  guesses: string[];
  currentGuess: string;
  letterStates: Map<string, LetterState>;
  status: GameStatus;

  // gameplay actions
  addToGuess: (letter: string) => void;
  removeFromGuess: () => void;
  submitGuess: () => void;
  updateLetterState: (guess: string[], guessStatus: LetterState[]) => void;
  resetGame: () => void;
  startGame: ({ answer, guessCount }: { answer: string; guessCount: number }) => void;
};

export const useWordleStore = create<WordleStore>((set, get) => ({
  letterCount: 5,
  guessCount: 6,
  answer: "",

  guesses: [],
  currentGuess: "",
  letterStates: new Map<string, LetterState>(),
  status: "idle",

  addToGuess: (letter) => {
    set((state) => ({
      currentGuess:
        state.currentGuess.length < state.letterCount ? state.currentGuess + letter.toUpperCase() : state.currentGuess,
    }));
  },

  removeFromGuess: () => {
    set((state) => ({
      currentGuess: state.currentGuess.slice(0, state.currentGuess.length - 1).toUpperCase(),
    }));
  },

  updateLetterState: (guess, guessStatus) => {
    set((state) => {
      const newLetterStates = state.letterStates;
      guess.forEach((letter: string, index) => {
        const current = newLetterStates.get(letter) ?? "empty";
        const newState = guessStatus[index];
        if (priority[newState] > priority[current]) {
          newLetterStates.set(letter, newState);
        }
      });
      return { ...state, letterStates: newLetterStates };
    });
  },

  submitGuess: () => {
    const { currentGuess, guesses, guessCount, letterCount, status, answer } = get();

    if (status === "won" || status === "lost") return;
    if (currentGuess.length !== letterCount) return;
    if (guesses.length >= guessCount) return;

    const nextGuesses = [...guesses, currentGuess];
    const hasUsedAllGuesses = nextGuesses.length >= guessCount;
    const isCorrect = answer && nextGuesses[nextGuesses.length - 1] === answer.toUpperCase();

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
      letterStates: new Map<string, LetterState>(),
      status: "idle",
    }),

  startGame: ({ answer, guessCount }: { answer: string; guessCount: number }) =>
    set({
      answer,
      letterCount: answer.length,
      guessCount,
      guesses: [],
      currentGuess: "",
      letterStates: new Map<string, LetterState>(),
      status: "playing",
    }),
}));
