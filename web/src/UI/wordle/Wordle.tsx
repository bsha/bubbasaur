import { useState, type KeyboardEvent } from "react";
import Board from "./Board/Board";
import Keyboard from "./Keyboard";

type Props = {};

const Wordle = ({}: Props) => {
  let GUESS_COUNT = 6;
  const [letterCount, setLetterCount] = useState(5);

  const onGuess = (_: KeyboardEvent) => {};

  return (
    <div className="">
      <div>
        <Board guessCount={GUESS_COUNT} letterCount={letterCount} />
        <Keyboard></Keyboard>
      </div>
      <div>
        <div>
          <label>Enter number of letters:</label>
          <input
            min="1"
            max="9"
            id="letterCount"
            type="number"
            value={letterCount}
            onBlur={(x) => setLetterCount(parseInt(x.target.value))}
          ></input>
        </div>
        <div>
          <label>Enter number of guesses allowed:</label>
          <input id="guessCount" type="number" value={GUESS_COUNT}></input>
        </div>
        <div>
          <label>Guess:</label>
          <input id="guess" type="text" maxLength={5} onKeyDown={onGuess}></input>
        </div>
      </div>
    </div>
  );
};

export default Wordle;
