import React, { PropsWithChildren, useState } from "react";
import { HistoryManager } from "./components/HistoryManager";
import { PageManager } from "./components/PageManager";
import { BuilderContextProvider } from "./context/BuilderContext";
import { useComponentsFromRegistry } from "./context/componentsRegistry";
import { useAddComponent } from "./context/hooks/useAddComponent";
import { useGetComponents } from "./context/hooks/useGetComponents";
import { useRemoveComponent } from "./context/hooks/useRemoveComponent";
import { useTotalComponentsCountForCurrentPage } from "./context/hooks/useTotalComponentsCountForCurrentPage";
import { useUpdateComponent } from "./context/hooks/useUpdateComponent";
import { generateNewId } from "./helpers/generateNewId";
import { useThrottle } from "./hooks/useThrottle";

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

function Component({ id, type }: { id: string; type: string }) {
  const componentRegistry = useComponentsFromRegistry(type);

  return (
    <div style={{ padding: "0 0 0 10px", borderBottom: "1px solid gray" }}>
      <ComponentContent id={id} />
      <ComponentChildren id={id} />
      <ComponentToolbar id={id} />
    </div>
  );
}

function ComponentsCount() {
  const totalComponentsCount = useTotalComponentsCountForCurrentPage();
  return <div className="meta">Total Components: {totalComponentsCount}</div>;
}

function ComponentContent({ id }: { id: string }) {
  const { current } = useGetComponents(id);
  const [data] = useState(current.type === "component" ? current.text : "");
  const throttle = useThrottle();
  const onUpdateComponent = useUpdateComponent();

  return (
    <div
      onInput={(e: React.FormEvent<HTMLDivElement>) => {
        throttle(
          () =>
            onUpdateComponent({
              ...current,
              text: (e.target as HTMLDivElement).innerHTML || "",
            }),
          50
        );
      }}
    >
      <div
        contentEditable={id !== "root"}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
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

function ComponentToolbar({ id }: { id: string }) {
  const onAddComponent = useAddComponent();
  const onRemoveComponent = useRemoveComponent();

  const addComponent = () => {
    const newId = generateNewId();
    onAddComponent({
      parent: id,
      id: newId,
      text: prompt("Enter content text") || "undefined",
      type: "component",
    });
  };

  const removeComponent = () => id !== "root" && onRemoveComponent(id);

  return (
    <div>
      <button onClick={() => addComponent()}>Add</button>
      <button onClick={() => removeComponent()}>Remove</button>
    </div>
  );
}

export default App;
