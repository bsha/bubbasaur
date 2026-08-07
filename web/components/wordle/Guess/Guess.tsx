import { useCallback, useEffect, useMemo } from "react";
import styles from "./Guess.module.scss";
import Tile from "./Tile";
import { useWordleStore } from "@/stores/useWordleStore";

type Props = {
  letterCount: number;
  value?: string;
  answer?: string;
  isSubmitted?: boolean;
  rowIndex?: number;
  isCurrentRow?: boolean;
};

const Guess = ({ letterCount, value = "", answer = "", isSubmitted = false, rowIndex = 0, isCurrentRow = false }: Props) => {
  let { updateLetterState } = useWordleStore();
  const guessArray = useMemo(
    () => [
      ...(value || "").split("").slice(0, letterCount),
      ...new Array<string>(Math.max(0, letterCount - (value || "").length)).fill(""),
    ],
    [letterCount, value],
  );

  const getStatuses = useCallback(
    (guess: string[], answer: string): LetterState[] => {
      if (!answer) return new Array<LetterState>(letterCount).fill("empty");
      const statuses = new Array<LetterState>(letterCount).fill("absent");
      const answerCount: Record<string, number> = {};
      for (const char of answer) {
        answerCount[char] = (answerCount[char] || 0) + 1;
      }
      // First pass: correct
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] && guess[i] === answer[i]) {
          statuses[i] = "correct";
          answerCount[guess[i]]--;
        }
      }
      // Second pass: present
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] && statuses[i] !== "correct" && answerCount[guess[i]] > 0) {
          statuses[i] = "present";
          answerCount[guess[i]]--;
        }
      }
      return statuses;
    },
    [letterCount],
  );
  const statuses = useMemo(
    () => (isSubmitted && value ? getStatuses(guessArray, answer) : new Array<LetterState>(letterCount).fill("empty")),
    [isSubmitted, value, answer, getStatuses, guessArray, letterCount],
  );

  useEffect(() => {
    updateLetterState(guessArray, statuses);
  }, [statuses]);

  const rowLabel = isSubmitted
    ? `Submitted guess ${rowIndex + 1}`
    : isCurrentRow
      ? "Current guess"
      : `Pending guess ${rowIndex + 1}`;

  return (
    <div
      className={styles.wordleGuess}
      role="row"
      aria-label={rowLabel}
      style={{ "--letter-count": letterCount } as React.CSSProperties}
    >
      {guessArray.map((it, index) => (
        <Tile key={index} status={statuses[index]} value={it} />
      ))}
    </div>
  );
};

export default Guess;
