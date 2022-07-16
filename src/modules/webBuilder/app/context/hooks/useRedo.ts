import { useContext } from "react";
import { context } from "../BuilderContext";

export const useRedo = () => useContext(context).redo;
