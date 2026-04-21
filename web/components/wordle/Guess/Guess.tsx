import "./Guess.css";
import Tile from "./Tile";

type Props = { letterCount: number; value?: string };

const Guess = ({ letterCount, value = "" }: Props) => {
  const guess = value ? value.split("") : new Array<string>(letterCount).fill("");
  if (value && value.length !== letterCount) {
    console.error("Incorrect word length");
  }
  console.log(guess);
  return (
    <div className="wordle-guess">
      {guess.map((it, index) => (
        <Tile key={index} status="NOT_GUESSED" value={it} />
      ))}
    </div>
  );
};

export default Guess;
