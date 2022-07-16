import React from "react";
import { createRoot } from "react-dom/client";
import { Title } from "./Title";

export const App = () => {
  const clickHandler = () => {
    alert("Hello World");
  };
  return (
    <div>
      Dimi <br />
      <Title />
      <button onClick={clickHandler}>Click me</button>
    </div>
  );
};

const root = document.getElementById("app");

if (root) {
  createRoot(root).render(<App />);
}
