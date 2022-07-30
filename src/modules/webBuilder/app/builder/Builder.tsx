import React from "react";
import { HistoryManager } from "../components/HistoryManager";
import { PageManager } from "../components/PageManager";
import { BuilderContextProvider } from "../context/BuilderContext";
import { BuilderWalker } from "./BuilderWalker";
import { ErrorBountry } from "./ErrorBoundry";
import "./builder.css";

export function Builder() {
  return (
    <BuilderContextProvider>
      <aside>
        <HistoryManager />
      </aside>
      <aside>
        <PageManager />
      </aside>
      <ErrorBountry>
        <main className="main">
          <BuilderWalker id="root" type="root-root" />
        </main>
      </ErrorBountry>
    </BuilderContextProvider>
  );
}
