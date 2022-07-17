import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type BockC = React.ComponentType<{ data: unknown }>;

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

export const ComponentRegistryProvider: FC<
  PropsWithChildren & { plugins: PluginJSONData }
> = ({ children }) => {
  const [publicComponents, setPublicComponents] = useState({});
  const [builderComponents, setBuilderComponents] = useState({});

  return (
    <componentsRegistryContext.Provider
      value={{
        publicComponents: {},
        builderComponents: {},
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

  return {
    PublicComponent: ctx?.publicComponents[type],
    BuilderComponent: ctx?.builderComponents[type],
  };
};
