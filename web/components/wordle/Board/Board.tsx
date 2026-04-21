import Guess from "../Guess/Guess";
import "./Board.css";

type Props = { guessCount: number; letterCount: number };

const Board = ({ guessCount, letterCount }: Props) => {
  return (
    <div className="wordle-board">
      {Array(guessCount)
        .fill("")
        .map((_, index) => (
          <Guess key={index} letterCount={letterCount}></Guess>
        ))}
    </div>
  );
};

export default Board;
