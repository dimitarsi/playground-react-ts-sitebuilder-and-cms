import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ComponentRegistryProvider } from "./context/ComponentsRegistry";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

fetch("/plugins.json")
  .then((res) => res.json())
  .then((plugins: PluginJSONData) => {
    root.render(
      <React.StrictMode>
        <ComponentRegistryProvider plugins={plugins}>
          <App />
        </ComponentRegistryProvider>
      </React.StrictMode>
    );
  });
