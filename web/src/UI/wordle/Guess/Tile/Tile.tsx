import React from "react";
import "./Tile.css";
import type { TileStatus, TileStatusType } from "./types";

type Props = { value: string; status: TileStatusType };

const Tile = ({ value = "" }: Props) => {
  return <div className="wordle-tile">{value}</div>;
};

export default Tile;
