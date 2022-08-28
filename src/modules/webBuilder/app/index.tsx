import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ComponentRegistryProvider } from "./context/ComponentsRegistry";
import { PluginsJSONData } from "../../../plugin.types";
import { defineModule } from "./require";

// TODO: move to constants
const PLUGINS_DIR_NAME = "plugins";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

window.r = React.createElement;
window.fr = React.Fragment;

// Expose react as package for iife plugins
defineModule("react", React);


async function start() {
  let data: PluginsJSONData = { plugins: {} };
  try {
    const response = await fetch("/plugins.json")
    const pluginsJson = await response.json()

    data = pluginsJson;

  } catch (error) {
    console.error(error)
  } finally {
    let counter = 0;

    const allScripts: string[] = [];

    Object.values(data.plugins).forEach((plugin) => {
      Object.values(plugin.browserEntries).forEach((entry) => {
        allScripts.push(`/${plugin.shortName}/${entry}`);
      });
    });

    if (!allScripts.length) {
      render({});
    }

    allScripts.forEach((entry) => {
      const script = document.createElement("script");
      script.src = entry;
      script.onload = () => {
        counter++;
        console.log("Counter", counter, allScripts.length);
        if (counter === allScripts.length) {
          render(data.plugins);
        }
      };
      document.body.appendChild(script);
    });
  }

}

function render(plugins: PluginsJSONData['plugins']) {
  root.render(
    <React.StrictMode>
      <ComponentRegistryProvider plugins={plugins}>
        <App />
      </ComponentRegistryProvider>
    </React.StrictMode>
  );
}

start();