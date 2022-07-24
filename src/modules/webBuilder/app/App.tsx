import React, { PropsWithChildren, useMemo, useState } from "react";
import { HistoryManager } from "./components/HistoryManager";
import { ListAllowedBlockTypes } from "./components/ListAllowedBlockTypes";
import { PageManager } from "./components/PageManager";
import { BuilderContextProvider } from "./context/BuilderContext";
import {
  useBuilderTypes,
  useComponentsFromRegistry,
} from "./context/ComponentsRegistry";
import { useAddComponent } from "./context/hooks/useAddComponent";
import { useGetComponents } from "./context/hooks/useGetComponents";
import { useRemoveComponent } from "./context/hooks/useRemoveComponent";
import { useTotalComponentsCountForCurrentPage } from "./context/hooks/useTotalComponentsCountForCurrentPage";
import { generateNewId } from "./helpers/generateNewId";

class MainComponent extends React.Component<
  PropsWithChildren,
  { hasError: boolean }
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">Ups, something went wrong</div>;
    }
    return <main>{this.props.children}</main>;
  }
}

function App() {
  const [blockTypes, setBlockTypes] = useState<string[]>([]);
  const [parentId, setParentId] = useState<string>("root");
  const [createBlockState, setCreateBlockState] = useState(false);
  return (
    <>
      <ComponentsCount />
      <div className="app">
        <BuilderContextProvider>
          <aside>
            <HistoryManager />
          </aside>
          <aside>
            <PageManager />
          </aside>
          <MainComponent>
            <Component id="root" type="root" />
          </MainComponent>
          {createBlockState && (
            <ListAllowedBlockTypes
              blockTypes={blockTypes}
              onClose={() => setCreateBlockState(false)}
              options={{ parentId }}
            />
          )}
        </BuilderContextProvider>
      </div>
    </>
  );
}

function Component({
  id,
  type,
}: PropsWithChildren<{
  id: string;
  type: string;
}>) {
  const r = useComponentsFromRegistry(type);
  const builderTypes = useBuilderTypes();
  const { current } = useGetComponents(id);

  if (!r.BuilderComponent || !r.PublicComponent) {
    return (
      <div style={{ padding: "0 0 0 10px", borderBottom: "1px solid gray" }}>
        <div className="error-boundary">Component of {type} not found.</div>
        <ComponentToolbar id={id} />
      </div>
    );
  }

  return (
    <div style={{ padding: "0 0 0 10px", borderBottom: "1px solid gray" }}>
      <r.BuilderComponent
        data={current}
        builderTypes={builderTypes}
        PublicComponent={r.PublicComponent}
        PublicComponentChildren={ComponentChildren}
        Footer={ComponentToolbar}
      />
    </div>
  );
}

function ComponentsCount() {
  const totalComponentsCount = useTotalComponentsCountForCurrentPage();
  return <div className="meta">Total Components: {totalComponentsCount}</div>;
}

function ComponentChildren({ id }: { id: string }) {
  const { children } = useGetComponents(id);

  return (
    <>
      {children.map((c) => (
        <Component key={c.id} {...c} />
      ))}
    </>
  );
}

type ToolbarProps = {
  id: string;
  builderTypes?: string[];
};

function ComponentToolbar({ id, builderTypes }: ToolbarProps) {
  const onAddComponent = useAddComponent();
  const onRemoveComponent = useRemoveComponent();
  const [show, setShow] = useState(false);
  const allowedBuilderTypes = useMemo(() => {
    return (builderTypes || []).filter((bt) => bt !== "root");
  }, [builderTypes]);

  const addComponent = (buildType: string) => {
    const newId = generateNewId();
    onAddComponent({
      parent: id,
      id: newId,
      data: undefined,
      type: buildType,
    });
    setShow(false);
  };

  const showBuildOptions = () => {
    setShow(true);
  };

  const removeComponent = () => id !== "root" && onRemoveComponent(id);

  const buildOptions = useMemo(
    () =>
      allowedBuilderTypes.map((bt) => {
        return (
          <span
            style={{}}
            key={bt}
            onClick={() => {
              addComponent(bt);
            }}
          >
            {bt}
          </span>
        );
      }),
    [allowedBuilderTypes]
  );

  return (
    <>
      <div>
        {Boolean(builderTypes?.length) && (
          <button onClick={showBuildOptions}>Add</button>
        )}
        <>{show && buildOptions}</>
        <button
          onClick={() => {
            removeComponent();
            setShow(false);
          }}
        >
          Remove
        </button>
      </div>
    </>
  );
}

export default App;
