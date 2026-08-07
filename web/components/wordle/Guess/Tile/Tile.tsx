import styles from "./Tile.module.scss";

type Props = { value: string; status: LetterState };

const Tile = ({ value = "", status = "empty" }: Props) => {
  return <div className={`${styles["wordle-tile"]} ${styles[`${status}`]}`}>{value}</div>;
};

export default Tile;
