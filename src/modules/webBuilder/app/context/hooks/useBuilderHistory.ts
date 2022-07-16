import { useContext } from "react";
import { context } from "../BuilderContext";

export const useBuilderHistory = () => {
  const ctx = useContext(context);

  return {
    entries: ctx.history,
    index: ctx.historyIndex,
  };
};
