import styles from "./Key.module.scss";

type Props = { value: string };

const Key = ({ value }: Props) => {
  return <button className={styles.keyboardKey}>{value}</button>;
};

export default Key;
