import React, { useState, useMemo, FC, memo, MouseEventHandler } from "react";
import { BuilderFooter } from "../blocks/types";
import { useAddComponent } from "../context/hooks/useAddComponent";
import { useRemoveComponent } from "../context/hooks/useRemoveComponent";
import { generateNewId } from "../helpers/generateNewId";
import "./toolbar.css";

type TypeClickHandler = (type: string) => void;

const ListAllowedTypes: FC<{
  allowedTypes: string[];
  onTypeClicked: TypeClickHandler;
}> = memo(({ allowedTypes, onTypeClicked }) => {
  return (
    <div className="toolbar-container">
      {allowedTypes.map((bt) => {
        return (
          <span
            key={bt}
            onClick={() => {
              onTypeClicked(bt);
            }}
            className="toolbar-item"
          >
            {bt}
          </span>
        );
      })}
    </div>
  );
});

const AddButton: FC<{ allowedTypes: string[]; onClick: MouseEventHandler }> = ({
  allowedTypes,
  onClick,
}) => {
  if (allowedTypes.length === 0) {
    return null;
  }

  return <button onClick={onClick}>Add</button>;
};

const RemoveButton: FC<{ onClick: MouseEventHandler; id: string }> = ({
  onClick,
  id,
}) => {
  if (id === "root") {
    return null;
  }
  return <button onClick={onClick}>Remove</button>;
};

export const BuilderToolbar: BuilderFooter = ({ id, allowedPublicTypes }) => {
  const onAddComponent = useAddComponent();
  const onRemoveComponent = useRemoveComponent();
  const [show, setShow] = useState(false);

  const allowedTypes = useMemo(() => {
    return (allowedPublicTypes || []).filter((bt) => bt !== "root-root");
  }, [allowedPublicTypes]);

  const addComponent = (buildType: string) => {
    const newId = generateNewId();
    onAddComponent({
      parent: id,
      id: newId,
      data: undefined,
      type: buildType,
    });
    setShow(false);
  };

  const showBuildOptions = () => {
    setShow(true);
  };
  const handleRemove = () => {
    // TODO: check if it works with root-root
    if (id !== "root") {
      onRemoveComponent(id);
    }
    setShow(false);
  };

  return (
    <div>
      <AddButton allowedTypes={allowedPublicTypes} onClick={showBuildOptions} />
      <RemoveButton id={id} onClick={handleRemove} />

      {show && (
        <ListAllowedTypes
          allowedTypes={allowedTypes}
          onTypeClicked={(bt: string) => addComponent(bt)}
        />
      )}
    </div>
  );
};
