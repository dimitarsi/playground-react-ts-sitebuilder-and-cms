import { useContext } from "react";
import { context } from "../BuilderContext";

export const useAddComponent = () => useContext(context).addComponent;
