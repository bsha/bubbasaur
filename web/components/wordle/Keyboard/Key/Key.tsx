import { Delete } from "lucide-react";
import styles from "./Key.module.scss";
import { Button } from "@/components/ui/button";
import { useWordleStore } from "@/stores/useWordleStore";

type Size = "sm" | "md";
type Props = { value: string; size?: Size; status: LetterState };

const Key = ({ value, size = "sm", status }: Props) => {
  const { status: gameStatus, addToGuess, removeFromGuess, submitGuess } = useWordleStore();
  const isEnter = value === "Enter";
  const isDelete = value === "Delete";
  const ariaLabel = isEnter ? "Enter guess" : isDelete ? "Delete letter" : `Letter ${value}`;

  const onKeyPress = (value: string) => () => {
    if (gameStatus !== "playing") {
      return;
    }
    if (value.length === 1 && /^[A-Za-z]+$/.test(value)) {
      addToGuess(value);
    } else if (value === "Delete") {
      removeFromGuess();
    } else if (value === "Enter") {
      submitGuess();
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      aria-label={ariaLabel}
      className={`p-2 m-0.5 uppercase ${styles["keyboard-key"]} ${styles[`${status}`]} lg:p-3`}
      onClick={onKeyPress(value)}
    >
      {isDelete ? <Delete /> : value}
    </Button>
  );
};

export default Key;
