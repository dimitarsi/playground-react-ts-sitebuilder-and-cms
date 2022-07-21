import React, { PropsWithChildren, ReactNode, useRef } from "react";
import { useGetComponents } from "../../../context/hooks/useGetComponents";
import { useUpdateComponent } from "../../../context/hooks/useUpdateComponent";
import { useThrottle } from "../../../hooks/useThrottle";
import { BuilderProps } from "../../types";
import { Data } from "./types";

export const BuilderTextBlock = ({
  data,
  builderTypes,
  PublicComponent,
  PublicComponentChildren,
  Footer,
}: BuilderProps<Data>) => {
  const throttle = useThrottle();
  const { current } = useGetComponents(data.id);
  const onUpdateComponent = useUpdateComponent();
  const blockRef = useRef<HTMLParagraphElement | null>(null);

  const filteredBuilderTypes = builderTypes.filter((bt) => bt !== "root");
  const handleEdit = () => {
    if (!blockRef.current) {
      return;
    }

    if (blockRef.current.contentEditable === "false") {
      blockRef.current.contentEditable = "true";
      return;
    }

    blockRef.current.contentEditable = "false";
  };

  const editOrCancelLabel = blockRef.current?.contentEditable
    ? "Cancel"
    : "Edit";

  return (
    <>
      <div>
        <button onClick={handleEdit}>{editOrCancelLabel}</button>
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
        <PublicComponent {...data} ref={blockRef}>
          <PublicComponentChildren id={data.id} />
        </PublicComponent>
        <Footer builderTypes={filteredBuilderTypes} id={data.id} />
      </div>
    </>
  );
};
