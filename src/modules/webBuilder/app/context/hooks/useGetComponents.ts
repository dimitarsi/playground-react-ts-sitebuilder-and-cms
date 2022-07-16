import { useContext } from "react";
import { context } from "../BuilderContext";

export const useGetComponents = (id: string) => {
  return useFilterComponentsById()(id);
};

export const useFilterComponentsById = () => {
  const ctx = useContext(context);
  const components = ctx.pageStates[ctx.currentPage].components;

  return (id: string) => {
    return {
      current: components[id],
      children: Object.values(components).filter((c) => c.parent === id),
    };
  };
};
