import { useCallback, useMemo } from "react";
import styles from "./Guess.module.scss";
import Tile from "./Tile";
import { TileStatus } from "./Tile/types";

type Props = {
  letterCount: number;
  value?: string;
  answer?: string;
  isSubmitted?: boolean;
  rowIndex?: number;
  isCurrentRow?: boolean;
};

const Guess = ({
  letterCount,
  value = "",
  answer = "",
  isSubmitted = false,
  rowIndex = 0,
  isCurrentRow = false,
}: Props) => {
  const guessArray = useMemo(
    () => [
      ...(value || "").split("").slice(0, letterCount),
      ...new Array<string>(
        Math.max(0, letterCount - (value || "").length),
      ).fill(""),
    ],
    [letterCount, value],
  );

  const getStatuses = useCallback(
    (guess: string[], answer: string): string[] => {
      if (!answer) return new Array(letterCount).fill(TileStatus.Empty);
      const statuses = new Array(letterCount).fill(TileStatus.Absent);
      const answerCount: Record<string, number> = {};
      for (const char of answer) {
        answerCount[char] = (answerCount[char] || 0) + 1;
      }
      // First pass: correct
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] && guess[i] === answer[i]) {
          statuses[i] = TileStatus.Correct;
          answerCount[guess[i]]--;
        }
      }
      // Second pass: present
      for (let i = 0; i < guess.length; i++) {
        if (
          guess[i] &&
          statuses[i] !== TileStatus.Correct &&
          answerCount[guess[i]] > 0
        ) {
          statuses[i] = TileStatus.Present;
          answerCount[guess[i]]--;
        }
      }
      return statuses;
    },
    [letterCount],
  );
  const statuses = useMemo(
    () =>
      isSubmitted && value
        ? getStatuses(guessArray, answer)
        : new Array(letterCount).fill(TileStatus.Empty),
    [isSubmitted, value, answer, getStatuses, guessArray, letterCount],
  );
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
