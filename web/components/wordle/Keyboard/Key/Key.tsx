import styles from "./Key.module.scss";
import { Button } from "@/components/ui/button";

type Props = { value: string; status: LetterState };

const Key = ({ value, status }: Props) => {
  const ariaLabel = value === "Enter" ? "Enter guess" : value === "Delete" ? "Delete letter" : `Letter ${value}`;

  return (
    <Button
      variant="outline"
      type="button"
      aria-label={ariaLabel}
      className={`p-3 m-0.5 uppercase ${styles["keyboard-key"]} ${styles[`${status}`]}`}
    >
      {value}
    </Button>
  );
};

export default Key;
