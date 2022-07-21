import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { BuilderRootBlock } from "../blocks/standart/Root/BuilderRootBlock";
import { BuilderTextBlock } from "../blocks/standart/TextBlock/BuilderTextBlock";
import { TextBlock } from "../blocks/standart/TextBlock/TextBlock";

type BlockCBase<T extends {}, S = any, D = any> = React.ComponentType<
  PropsWithChildren<
    {
      data: D;
      state: S;
      onSaveState: (state: S) => void;
      builder?: boolean;
    } & T
  >
>;
type BlockC = BlockCBase<{}>;

type BuilderBlockC = BlockCBase<{
  builderTypes: string[];
  PublicComponent?: React.ReactNode;
  Toolbar?: React.ReactNode;
  onCreateBlock: (filteredTypes: string[]) => void;
}>;

interface ComponentRegistry {
  publicComponents: Record<string, BlockC>;
  builderComponents: Record<string, BuilderBlockC>;
  addComponent: (
    type: string,
    publicComponent: BlockC,
    builderComponents: BuilderBlockC
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
  root: BuilderRootBlock,
  textBlock: BuilderTextBlock,
};

export const ComponentRegistryProvider: FC<
  PropsWithChildren & { plugins: PluginJSONData }
> = ({ children }) => {
  const [publicComponents, setPublicComponents] =
    useState<Record<string, BlockC>>(publicStandard);
  const [builderComponents, setBuilderComponents] =
    useState<Record<string, BuilderBlockC>>(builderStandard);

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
