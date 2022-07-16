import { useContext } from "react";
import { context } from "../BuilderContext";

export const usePages = () => {
  const ctx = useContext(context);
  return ctx.pages;
};
