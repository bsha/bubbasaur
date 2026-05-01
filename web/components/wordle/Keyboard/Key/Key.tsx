import { Button } from "@/components/ui/button";

type Props = { value: string };

const Key = ({ value }: Props) => {
  return (
    <Button variant="outline" className="p-3 m-0.5 uppercase">
      {value}
    </Button>
  );
};

export default Key;
