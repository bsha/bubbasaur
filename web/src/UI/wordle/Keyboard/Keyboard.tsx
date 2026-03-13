import React from "react";
import Key from "./Key/Key";

type Props = {};

const keyboardValues: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
];

const Keyboard = ({}: Props) => {
  return keyboardValues.map((row) => (
    <div>
      {row.map((key) => (
        <Key value={key}></Key>
      ))}
    </div>
  ));
};

export default Keyboard;
