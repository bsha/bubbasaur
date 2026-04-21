import "./Key.module.scss";

type Props = { value: string };

const Key = ({ value }: Props) => {
  return <button className="keyboard-key">{value}</button>;
};

export default Key;
