import React, { PropsWithChildren, useEffect } from "react";
import { defaultData, useBuilderState } from "./builder.state";
import { PERSIST_KEY } from "./constants";
import { CompleteBuilderState } from "./types";

export const context = React.createContext<CompleteBuilderState>(
  defaultData as CompleteBuilderState
);

export const BuilderContextProvider = ({ children }: PropsWithChildren) => {
  const state = useBuilderState();

  useEffect(() => {
    const { history, historyIndex, ...stateWithoutHistory } = state;
    window?.localStorage.setItem(
      PERSIST_KEY,
      JSON.stringify(stateWithoutHistory)
    );
  });

  return <context.Provider value={state}>{children}</context.Provider>;
};
