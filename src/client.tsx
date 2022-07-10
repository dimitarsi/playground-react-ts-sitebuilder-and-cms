import { hydrateRoot } from "react-dom/client";
import React from "react";

fetch("/plugins.json")
  .then((res) => res.json())
  .then(({ plugins }) => {
    const Client = () => {
      return (
        <>
          {plugins.map((p: { pluginName: string }) => {
            // @ts-ignore
            const Component = window.Components[p.pluginName] || null;
            if (!Component) return null;

            return <Component key={p.pluginName} />;
          })}
        </>
      );
    };

    const app = document.getElementById("app");
    console.log("Hydrating");
    if (app) {
      hydrateRoot(app, <Client />);
    }
  });
