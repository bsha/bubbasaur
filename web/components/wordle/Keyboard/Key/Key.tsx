import { Delete } from "lucide-react";
import styles from "./Key.module.scss";
import { Button } from "@/components/ui/button";

type Props = { value: string; status: LetterState };

const Key = ({ value, status }: Props) => {
  const isEnter = value === "Enter";
  const isDelete = value === "Delete";
  const ariaLabel = isEnter ? "Enter guess" : isDelete ? "Delete letter" : `Letter ${value}`;

  return (
    <Button
      variant="outline"
      type="button"
      aria-label={ariaLabel}
      className={`p-2 m-0.5 uppercase ${styles["keyboard-key"]} ${styles[`${status}`]} lg:p-3`}
    >
      {isDelete ? <Delete /> : value}
    </Button>
  );
};

export default Key;
