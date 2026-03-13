import React from "react";
import Guess from "../Guess/Guess";
import "./Board.css";

type Props = { guessCount: number; letterCount: number };

const Board = ({ guessCount, letterCount }: Props) => {
  return (
    <div className="wordle-board">
      {Array(guessCount)
        .fill("")
        .map((_) => (
          <Guess letterCount={letterCount}></Guess>
        ))}
    </div>
  );
};

export default Board;
