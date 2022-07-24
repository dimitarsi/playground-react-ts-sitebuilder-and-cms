import React from "react";
import { BuilderProps } from "../../types";

export const BuilderRootBlock = ({
  PublicComponent,
  PublicComponentChildren,
  Footer,
  data,
  builderTypes,
}: BuilderProps<{ id: string }>) => {
  return (
    <div>
      <PublicComponent {...data}>
        <PublicComponentChildren id={data.id} />
      </PublicComponent>
      <Footer id={data.id} builderTypes={builderTypes} />
    </div>
  );
};
