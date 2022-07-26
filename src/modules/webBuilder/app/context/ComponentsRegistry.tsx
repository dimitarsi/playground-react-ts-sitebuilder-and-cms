import React, {
  ComponentType,
  createContext,
  FC,
  ForwardRefExoticComponent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { BuilderRootBlock } from "../blocks/standart/Root/BuilderRootBlock";
import { BuilderTextBlock } from "../blocks/standart/TextBlock/BuilderTextBlock";
import { TextBlock } from "../blocks/standart/TextBlock/TextBlock";
import { BuilderProps } from "../blocks/types";

type PublicComponentType = ComponentType | ForwardRefExoticComponent<any>;
type BuilderComponentType =
  | ComponentType<BuilderProps<any>>
  | ForwardRefExoticComponent<BuilderProps<any>>;
type Registry = Record<string, PublicComponentType>;

type BuilderRegistry = Record<string, BuilderComponentType>;

interface ComponentRegistry {
  publicComponents: Registry;
  builderComponents: BuilderRegistry;
  addComponent: (
    type: string,
    publicComponent: PublicComponentType,
    builderComponents: BuilderComponentType
  ) => void;
}

const componentsRegistryContext = createContext<ComponentRegistry | null>(null);

const RootComponent = ({ children }: PropsWithChildren<{ data?: any }>) => (
  <React.Fragment>{children}</React.Fragment>
);
const publicStandard: Registry = {
  root: RootComponent,
  textBlock: TextBlock,
};
const builderStandard: BuilderRegistry = {
  root: BuilderRootBlock,
  textBlock: BuilderTextBlock,
};

export const ComponentRegistryProvider: FC<
  PropsWithChildren & { plugins: PluginJSONData }
> = ({ children }) => {
  const [publicComponents, setPublicComponents] =
    useState<Registry>(publicStandard);
  const [builderComponents, setBuilderComponents] =
    useState<BuilderRegistry>(builderStandard);

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

export const useBuilderTypes = () => {
  const ctx = useContext(componentsRegistryContext);
  if (!ctx) {
    throw "Component Registry is misssing";
  }

  return Object.keys(ctx.builderComponents);
};
