import { Button } from "@/components/ui/button";

type Props = { value: string };

const Key = ({ value }: Props) => {
  const ariaLabel =
    value === "Enter"
      ? "Enter guess"
      : value === "Delete"
      ? "Delete letter"
      : `Letter ${value}`;

  return (
    <Button
      variant="outline"
      type="button"
      aria-label={ariaLabel}
      className="p-3 m-0.5 uppercase"
    >
      {value}
    </Button>
  );
};

export default Key;
