import { useContext } from "react";
import { context } from "../BuilderContext";

export const useRemovePage = () => useContext(context).removePage;
