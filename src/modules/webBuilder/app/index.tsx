import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ComponentRegistryProvider } from "./context/ComponentsRegistry";
import { PluginsJSONData } from "../../../plugin.types";

// TODO: move to constants
const PLUGINS_DIR_NAME = "plugins";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

window.r = React.createElement;
window.fr = React.Fragment;

fetch("/plugins.json")
  .then((res) => res.json())
  .then((data: PluginsJSONData) => {
    let counter = 0;
    const allScripts: string[] = [];
    Object.values(data.plugins).forEach((plugin) => {
      Object.values(plugin.browserEntries).forEach((entry) => {
        allScripts.push(`/${plugin.shortName}/${entry}`);
      });
    });

    allScripts.forEach((entry) => {
      const script = document.createElement("script");
      script.src = entry;
      script.onload = () => {
        counter++;
        console.log("Counter", counter, allScripts.length);
        if (counter === allScripts.length) {
          root.render(
            <React.StrictMode>
              <ComponentRegistryProvider plugins={data.plugins}>
                <App />
              </ComponentRegistryProvider>
            </React.StrictMode>
          );
        }
      };
      document.body.appendChild(script);
    });
  });
