import React, { PropsWithChildren } from "react";
import {
  useComponentsFromRegistry,
  usePublicTypes,
} from "../context/ComponentsRegistry";
import { useGetComponents } from "../context/hooks/useGetComponents";
import { useUpdateComponent } from "../context/hooks/useUpdateComponent";
import { BuilderToolbar } from "./BuilderToolbar";
import "./walker.css";

function BuilderChildrenWalker({ id }: { id: string }) {
  const { children } = useGetComponents(id);

  return (
    // <div className="walker-children">
    <>
      {children.map((c) => (
        <BuilderWalker key={c.id} {...c} />
      ))}
    </>
    // </div>
  );
}

export function BuilderWalker({
  id,
  type,
}: PropsWithChildren<{
  id: string;
  type: string;
}>) {
  const r = useComponentsFromRegistry(type);
  const publicTypes = usePublicTypes();
  const { current } = useGetComponents(id);
  const updateComponent = useUpdateComponent();

  if (!r.BuilderComponent || !r.PublicComponent) {
    return (
      <div className="walker-container">
        <div className="error-boundary">Component of {type} not found.</div>
        <BuilderToolbar id={id} allowedPublicTypes={[]} />
      </div>
    );
  }

  return (
    <div className="walker-container">
      <r.BuilderComponent
        data={current}
        allPublicTypes={publicTypes}
        PublicComponent={r.PublicComponent}
        PublicComponentChildren={BuilderChildrenWalker}
        Footer={BuilderToolbar}
        onComponentUpdate={(data) =>
          updateComponent({ ...current, data: data.data })
        }
      />
    </div>
  );
}
