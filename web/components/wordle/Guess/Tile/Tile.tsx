import styles from "./Tile.module.scss";
import type { TileStatusType } from "./types";
import { TileStatus } from "./types";

type Props = { value: string; status: TileStatusType };

const Tile = ({ value = "", status = TileStatus.Empty }: Props) => {
  return (
    <div className={`${styles["wordle-tile"]} ${styles[`${status}`]}`}>
      {value}
    </div>
  );
};

export default Tile;
