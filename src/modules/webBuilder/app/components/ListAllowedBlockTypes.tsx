import React, { PropsWithChildren } from "react";
import { useAddComponent } from "../context/hooks/useAddComponent";

const createBlock = (
  closeHandler: () => void,
  options: { parentId: string }
) => {
  const addComponent = useAddComponent();
  return (blockType: string) => {
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          closeHandler();
          addComponent({
            type: blockType,
            id: "1", // TODO: some id
            parent: options.parentId, // TODO: add parent
            data: null, // TODO: create component with empty data
          });
        }}
      >
        {blockType}
      </a>
    );
  };
};

export const ListAllowedBlockTypes = (
  props: PropsWithChildren<{
    blockTypes: string[];
    onClose: () => void;
    options: { parentId: string };
  }>
) => {
  return (
    <div className="overlay">
      <div className="blockList">
        {props.blockTypes.map(createBlock(props.onClose, props.options))}
      </div>
    </div>
  );
};
