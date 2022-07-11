import { hydrateRoot } from "react-dom/client";
import React from "react";

fetch("/plugins.json")
  .then((res) => res.json())
  .then(({ plugins }) => {
    const Client = () => {
      return (
        <>
          {plugins.map((p: { pluginName: string }) => {
            const plugin =
              // @ts-ignore
              window.Components.find(
                (c: { plugin: string }) => c.plugin === p.pluginName
              );

            if (!plugin) return null;

            console.log(plugin.Component);

            return <plugin.Component key={p.pluginName} />;
          })}
        </>
      );
    };

    const app = document.getElementById("app");

    if (app) {
      hydrateRoot(app, <Client />);
    }
  });
