import React from "react";
import { useBuilderHistory } from "../context/hooks/useBuilderHistory";
import { useRedo } from "../context/hooks/useRedo";
import { useUndo } from "../context/hooks/useUndo";

export const HistoryManager = () => {
  const { entries, index } = useBuilderHistory();
  const undo = useUndo();
  const redo = useRedo();

  return (
    <div className="history-manager">
      <div>
        <button onClick={() => undo()}>Undo</button>
        <button onClick={() => redo()}>Redo</button>
      </div>
      <div>
        Current index: {index} / {entries.length}
      </div>
      {entries
        .map((e) => e.action.type)
        .map((type, i) => {
          const undone = i > index ? "undone" : "";
          return (
            <div key={`${i}-${type}`} className={undone}>
              {type}
            </div>
          );
        })}
    </div>
  );
};
