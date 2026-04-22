import styles from "./Guess.module.scss";
import Tile from "./Tile";
import { TileStatus } from "./Tile/types";

type Props = {
  letterCount: number;
  value?: string;
  answer?: string;
  isSubmitted?: boolean;
};

const Guess = ({
  letterCount,
  value = "",
  answer = "",
  isSubmitted = false,
}: Props) => {
  const guessArray = [
    ...(value || "").split("").slice(0, letterCount),
    ...new Array<string>(Math.max(0, letterCount - (value || "").length)).fill(
      "",
    ),
  ];

  const getStatuses = (guess: string[], answer: string): string[] => {
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
  };

  const statuses =
    isSubmitted && value
      ? getStatuses(guessArray, answer)
      : new Array(letterCount).fill(TileStatus.Empty);

  return (
    <div className={styles.wordleGuess}>
      {guessArray.map((it, index) => (
        <Tile key={index} status={statuses[index]} value={it} />
      ))}
    </div>
  );
};

export default Guess;
