import "@/components/wordle/Guess/Guess";
import "./Tile.css";
import type { TileStatusType } from "./types";

type Props = { value: string; status: TileStatusType };

const Tile = ({ value = "", status = "NOT_GUESSED" }: Props) => {
  return <div className="wordle-tile">{value}</div>;
};

export default Tile;
