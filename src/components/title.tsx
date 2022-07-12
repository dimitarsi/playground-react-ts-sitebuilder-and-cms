import React from "react";
import { clickHandler } from "./clickHandler";

export const Component = () => {
  const title = "foobar";

  return <h1 onClick={clickHandler}>{title}</h1>;
};
