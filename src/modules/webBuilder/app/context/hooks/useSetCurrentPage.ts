import { useContext } from "react";
import { context } from "../BuilderContext";

export const useSetCurrentPage = () => {
  return useContext(context).setCurrentPage;
};
