import { useContext } from "react";
import { context } from "../BuilderContext";
import { useFilterComponentsById } from "./useGetComponents";

export const useRemoveComponent = () => {
  const removeById = useContext(context).removeComponent;
  const getFilteredChildren = useFilterComponentsById();

  const recursiveRemove = (id: string) => {
    removeById(id);
    const { children } = getFilteredChildren(id);
    children
      .map((c) => c.id)
      .forEach((childId) => {
        recursiveRemove(childId);
      });
  };

  return recursiveRemove;
};
