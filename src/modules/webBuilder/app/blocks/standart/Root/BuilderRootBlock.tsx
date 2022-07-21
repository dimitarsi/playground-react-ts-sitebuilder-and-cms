import React, { PropsWithChildren } from "react";

export const BuilderRootBlock = (
  props: PropsWithChildren<{
    PublicComponent: React.ReactNode;
    Footer: React.ReactNode;
    builderTypes: string[];
  }>
) => {
  return (
    <div>
      {props.PublicComponent}
      {props.Footer}
    </div>
  );
};
