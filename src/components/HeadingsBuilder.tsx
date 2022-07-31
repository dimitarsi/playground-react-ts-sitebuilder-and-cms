import React, { useState } from "react";
import data from "./HeadingsPlugin.json";

const getPublicData = (data: { id: string; data: any }) => {
  return {
    ...data,
    data: data.data || "Heading",
  };
};

export const Component = ({
  PublicComponent,
  PublicComponentChildren,
  Footer,
  data,
}: {
  PublicComponent: React.ComponentType<
    React.PropsWithChildren<{ id: string; data: string }>
  >;
  PublicComponentChildren: React.ComponentType<{ id: string }>;
  Footer: React.ComponentType<{ id: string; allowedPublicTypes: string[] }>;
  data: { id: string; data: string };
}) => {
  const [state, setComponentState] = useState(1);
  const publicProps = getPublicData(data);
  return (
    <div>
      <div>
        <button onClick={() => setComponentState(state + 1)}>Click</button>
      </div>
      <PublicComponent {...publicProps}>
        <PublicComponentChildren id={data.id} />
      </PublicComponent>
      <Footer id={data.id} allowedPublicTypes={[]} />
    </div>
  );
};

export const type = data.shortName;
