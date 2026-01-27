import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Guess from "./UI/wordle/Guess/Guess";
import Board from "./UI/wordle/Board/Board";
import Wordle from "./UI/wordle/Wordle";

const App = () => {
  return <Wordle />;
};

export default App;
