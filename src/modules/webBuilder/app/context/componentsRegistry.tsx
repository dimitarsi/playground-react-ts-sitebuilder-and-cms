import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { BuilderTextBlock } from "../blocks/standart/BuilderTextBlock";
import { TextBlock } from "../blocks/standart/TextBlock";

type BockC<S = any, D = any> = React.ComponentType<
  PropsWithChildren<{
    data: D;
    state: S;
    onSaveState: (state: S) => void;
    builder?: boolean;
  }>
>;

interface ComponentRegistry {
  publicComponents: Record<string, BockC>;
  builderComponents: Record<string, BockC>;
  addComponent: (
    type: string,
    PublicComponent: BockC,
    builderComponents: BockC
  ) => void;
}

const componentsRegistryContext = createContext<ComponentRegistry | null>(null);

const RootComponent = ({ children }: PropsWithChildren<{ data?: any }>) => (
  <React.Fragment>{children}</React.Fragment>
);
const publicStandard = {
  root: RootComponent,
  textBlock: TextBlock,
};
const builderStandard = {
  root: RootComponent,
  textBlock: BuilderTextBlock,
};

export const ComponentRegistryProvider: FC<
  PropsWithChildren & { plugins: PluginJSONData }
> = ({ children }) => {
  const [publicComponents, setPublicComponents] =
    useState<Record<string, BockC>>(publicStandard);
  const [builderComponents, setBuilderComponents] =
    useState<Record<string, BockC>>(builderStandard);

  return (
    <componentsRegistryContext.Provider
      value={{
        publicComponents,
        builderComponents,
        addComponent: (type, PublicComp, BuilderComp) => {
          setPublicComponents({
            ...publicComponents,
            [type]: PublicComp,
          });
          setBuilderComponents({
            ...builderComponents,
            [type]: BuilderComp,
          });
        },
      }}
    >
      {children}
    </componentsRegistryContext.Provider>
  );
};

export const useComponentsFromRegistry = (type: string) => {
  const ctx = useContext(componentsRegistryContext);
  if (!ctx) {
    throw "Component Registry is misssing";
  }

  return {
    PublicComponent: ctx.publicComponents[type],
    BuilderComponent: ctx.builderComponents[type],
  };
};
