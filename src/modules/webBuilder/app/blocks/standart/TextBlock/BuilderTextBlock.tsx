import React, { ReactNode, useMemo, useRef, useState } from "react";
import { useUpdateComponent } from "../../../context/hooks/useUpdateComponent";
import { useThrottle } from "../../../hooks/useThrottle";
import { BuilderProps } from "../../types";
import { Data } from "./types";

const DEFAULT_DATA = "Text";

function getPublicComponentProps({
  data,
  id,
  type,
  parent,
}: Data & { data: Data["data"] | undefined }) {
  return {
    id,
    type,
    parent,
    data: data || DEFAULT_DATA,
  };
}

export const BuilderTextBlock = ({
  data,
  PublicComponent,
  PublicComponentChildren,
  Footer,
}: BuilderProps<Data>) => {
  const throttle = useThrottle();
  const onUpdateComponent = useUpdateComponent();
  const blockRef = useRef<HTMLParagraphElement | null>(null);
  const [editLabel, setEditLabel] = useState("Edit");

  const handleEdit = () => {
    if (!blockRef.current) {
      return;
    }

    if (blockRef.current.contentEditable === "true") {
      blockRef.current.contentEditable = "false";
      setEditLabel("Edit");
      return;
    }

    blockRef.current.contentEditable = "true";
    setEditLabel("Cancel");
  };
  /**
   * Preserve the cursor position.
   * Without this the component gets rerendered and the cursor jumps back to the
   * begining after each stroke.
   */
  const contentsRef = useRef<ReactNode | null>(null);

  const contents = useMemo(() => {
    return (
      <PublicComponent {...getPublicComponentProps(data)} ref={blockRef}>
        <PublicComponentChildren id={data.id} />
      </PublicComponent>
    );
  }, [data.data, data.parent]);

  /**
   * Only render the new instance if the innerHTML is different from what we have in the
   * component data.
   * This allows us to listen for changes on the outside, in case we implement an "Edit Panel" to
   * modify component properties.
   */
  if (!contentsRef.current || data.data !== blockRef.current?.innerHTML) {
    contentsRef.current = contents;
  }

  return (
    <>
      <div>
        <button onClick={handleEdit}>{editLabel}</button>
      </div>
      <div
        onInput={(e: React.FormEvent<HTMLDivElement>) => {
          throttle(
            () =>
              onUpdateComponent({
                parent: data.parent,
                id: data.id,
                type: data.type,
                data: (e.target as HTMLDivElement).innerHTML || "",
              }),
            300
          );
        }}
      >
        {contentsRef.current}
      </div>
      <Footer allowedPublicTypes={[]} id={data.id} />
    </>
  );
};
