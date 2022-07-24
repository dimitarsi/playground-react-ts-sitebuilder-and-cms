import React, { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { useGetComponents } from "../../../context/hooks/useGetComponents";
import { useUpdateComponent } from "../../../context/hooks/useUpdateComponent";
import { useThrottle } from "../../../hooks/useThrottle";
import { BuilderProps } from "../../types";
import { Data } from "./types";

const DEFAULT_DATA = "Text";

function getPublicComponentProps({
  data,
  id,
  type,
}: Data & { data: Data["data"] | undefined }) {
  return {
    id,
    type,
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
  const { current } = useGetComponents(data.id);
  const onUpdateComponent = useUpdateComponent();
  const blockRef = useRef<HTMLParagraphElement | null>(null);
  const [editLabel, setEditLabel] = useState("Edit");

  const handleEdit = () => {
    if (!blockRef.current) {
      return;
    }

    if (blockRef.current.contentEditable === "false") {
      blockRef.current.contentEditable = "true";
      setEditLabel("Cancel");
      return;
    }

    blockRef.current.contentEditable = "false";
    setEditLabel("Edit");
  };

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
                ...current,
                data: (e.target as HTMLDivElement).innerHTML || "",
              }),
            50
          );
        }}
      >
        <PublicComponent {...getPublicComponentProps(data)} ref={blockRef}>
          <PublicComponentChildren id={data.id} />
        </PublicComponent>
        <Footer builderTypes={[]} id={data.id} />
      </div>
    </>
  );
};
