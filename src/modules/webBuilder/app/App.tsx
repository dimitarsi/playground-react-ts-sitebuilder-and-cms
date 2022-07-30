import React from "react";
import { Builder } from "./builder/Builder";
import { useTotalComponentsCountForCurrentPage } from "./context/hooks/useTotalComponentsCountForCurrentPage";

function App() {
  return (
    <>
      <ComponentsCount />
      <div className="app">
        <Builder />
      </div>
    </>
  );
}

function ComponentsCount() {
  const totalComponentsCount = useTotalComponentsCountForCurrentPage();
  return <div className="meta">Total Components: {totalComponentsCount}</div>;
}

export default App;
