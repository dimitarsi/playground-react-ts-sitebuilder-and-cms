import React, {
  ComponentType,
  createContext,
  FC,
  ForwardRefExoticComponent,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { PluginsJSONData } from "../../../../plugin.types";
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
  "root-root": RootComponent,
  "text-text": TextBlock,
};
const builderStandard: BuilderRegistry = {
  "root-builder": BuilderRootBlock,
  "text-builder": BuilderTextBlock,
};

const ComponentNotFound = () => <div>Component NOT Found</div>;

function getPublicComponents(plugins: PluginsJSONData["plugins"]): Registry {
  const publicComponentsFromPlugins = Object.keys(plugins).reduce(
    (acc, pluginName) => {
      const pluginData = plugins[pluginName];
      const entries = Object.keys(pluginData.browserEntries).filter(
        (be) => be !== `${pluginData.shortName}-builder`
      );
      const registryEntries = entries.reduce((acc, entryName) => {
        const component = window.Components.find(
          (c) => c.plugin === entryName
        )?.Component;
        return {
          ...acc,
          // @ts-ignore
          [entryName]: component || ComponentNotFound,
        };
      }, {});

      return {
        ...acc,
        ...registryEntries,
      };
    },
    {}
  );

  return publicComponentsFromPlugins;
}

function getBuilderComponents(
  plugins: PluginsJSONData["plugins"]
): BuilderRegistry {
  return Object.keys(plugins).reduce((acc, pluginName) => {
    const pluginData = plugins[pluginName];
    const builderEntryKey = `${pluginData.shortName}-builder`;

    const component = window.Components.find(
      (c) => c.plugin === builderEntryKey
    )?.Component;

    return {
      ...acc,
      [builderEntryKey]: component || ComponentNotFound,
    };
  }, {});
}

export const ComponentRegistryProvider: FC<
  PropsWithChildren<PluginsJSONData>
> = ({ children, plugins }) => {
  const publicComponentsFromPlugins = useMemo(
    () => getPublicComponents(plugins),
    []
  );
  const builderComponentsFromPlugins = useMemo(
    () => getBuilderComponents(plugins),
    []
  );

  const [publicComponents, setPublicComponents] = useState<Registry>({
    ...publicStandard,
    ...publicComponentsFromPlugins,
  });

  const [builderComponents, setBuilderComponents] = useState<BuilderRegistry>({
    ...builderStandard,
    ...builderComponentsFromPlugins,
  });

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

  // gets the builder key eg headings-h1, the builder should be headings-builder
  const builderKey = `${type.split("-")[0]}-builder`;

  return {
    PublicComponent: ctx.publicComponents[type],
    BuilderComponent: ctx.builderComponents[builderKey],
  };
};

export const usePublicTypes = () => {
  const ctx = useContext(componentsRegistryContext);
  if (!ctx) {
    throw "Component Registry is misssing";
  }

  return Object.keys(ctx.publicComponents);
};
