import { useContext } from "react";
import { context } from "../BuilderContext";

export const useAddPage = () => {
  return useContext(context).addPage;
};
