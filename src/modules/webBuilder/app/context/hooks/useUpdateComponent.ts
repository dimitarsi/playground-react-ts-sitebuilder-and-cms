import { useContext } from "react";
import { context } from "../BuilderContext";

export const useUpdateComponent = () => {
  return useContext(context).updateComponent;
};
