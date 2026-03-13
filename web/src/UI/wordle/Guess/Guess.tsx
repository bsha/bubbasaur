import React from "react";
import Tile from "./Tile";
import "./Guess.css";

type Props = { letterCount: number; value?: string };

const Guess = ({ letterCount, value = "" }: Props) => {
  let guess = value ? value.split("") : new Array<string>(letterCount).fill("");
  if (value && value.length !== letterCount) {
    console.error("Incorrect word length");
  }
  console.log(guess);
  return (
    <div className="wordle-guess">
      {guess.map((it) => (
        <Tile value={it} />
      ))}
    </div>
  );
};

export default Guess;
