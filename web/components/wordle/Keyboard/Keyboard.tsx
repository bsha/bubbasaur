import Key from "./Key/Key";
import styles from "./Keyboard.module.scss";

const keyboardValues: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
];

const Keyboard = () => {
  return keyboardValues.map((row, index) => (
    <div key={index} className={styles.keyboardRow}>
      {row.map((key, index) => (
        <Key key={index} value={key}></Key>
      ))}
    </div>
  ));
};

export default Keyboard;
