import React, { PropsWithChildren, useState } from "react";
import { HistoryManager } from "./components/HistoryManager";
import { PageManager } from "./components/PageManager";
import { BuilderContextProvider } from "./context/BuilderContext";
import { useComponentsFromRegistry } from "./context/componentsRegistry";
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
        </BuilderContextProvider>
      </div>
    </>
  );
}

function Component({
  id,
  type,
}: PropsWithChildren<{ id: string; type: string }>) {
  const r = useComponentsFromRegistry(type);
  const [state, setState] = useState<unknown>(undefined);
  const saveState = (newState: unknown) => setState(newState);
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
        data={{ id, type }}
        state={state}
        onSaveState={saveState}
      >
        <r.PublicComponent
          data={{ builder: true, ...current }}
          state={state}
          onSaveState={saveState}
        >
          <ComponentChildren id={id} />
        </r.PublicComponent>
        <ComponentToolbar id={id} />
      </r.BuilderComponent>
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
    <div>
      {children.map((c) => (
        <Component key={c.id} id={c.id} type={c.type} />
      ))}
    </div>
  );
}

function ComponentToolbar({ id, children }: PropsWithChildren<{ id: string }>) {
  const onAddComponent = useAddComponent();
  const onRemoveComponent = useRemoveComponent();

  const addComponent = () => {
    const newId = generateNewId();
    onAddComponent({
      parent: id,
      id: newId,
      data: prompt("Enter content text") || "undefined",
      type: "textBlock",
    });
  };

  const removeComponent = () => id !== "root" && onRemoveComponent(id);

  return (
    <>
      <div>
        <button onClick={() => addComponent()}>Add</button>
        <button onClick={() => removeComponent()}>Remove</button>
      </div>
      {children}
    </>
  );
}

export default App;
