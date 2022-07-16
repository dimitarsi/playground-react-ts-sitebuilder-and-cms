import { useContext } from "react";
import { context } from "../BuilderContext";

export const useTotalComponentsCountForCurrentPage = () => {
  const ctx = useContext(context);
  const pageState = ctx.pageStates[ctx.currentPage];

  return Object.keys(pageState.components).length;
};
