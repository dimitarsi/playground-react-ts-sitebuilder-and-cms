import { useContext } from "react";
import { context } from "../BuilderContext";

export const useUndo = () => useContext(context).undo;
