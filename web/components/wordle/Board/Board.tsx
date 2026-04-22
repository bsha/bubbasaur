import Guess from "../Guess/Guess";
import styles from "./Board.module.scss";

type Props = {
  guessCount: number;
  letterCount: number;
  guesses: string[];
  currentGuess: string;
  answer: string;
};

const Board = ({
  guessCount,
  letterCount,
  guesses,
  currentGuess,
  answer,
}: Props) => {
  return (
    <div className={styles.wordleBoard}>
      {Array(guessCount)
        .fill("")
        .map((_, index) => {
          let value = "";
          const isSubmitted = index < guesses.length;
          if (index < guesses.length) {
            value = guesses[index];
          } else if (index === guesses.length) {
            value = currentGuess;
          }
          return (
            <Guess
              key={index}
              letterCount={letterCount}
              value={value}
              answer={answer}
              isSubmitted={isSubmitted}
            />
          );
        })}
    </div>
  );
};

export default Board;
