import React from "react";
// @ts-ignore
window.module = { exports: null };

const Components: Record<string, React.Component> = {};

function registerScript(pluginName: string, pluginPath: string) {
  const scrpt = document.createElement("script");

  // scrpt.onload = function () {
  //   // // console.log(window.module.exports);
  //   // setTimeout(() => {
  //   //   Components[pluginName] =
  //   //   window.module.exports?.Component || window.module.exports?.Component3;
  //   // }, 0)
  // };
  scrpt.src = pluginPath;
  document.body.appendChild(scrpt);
}

if (typeof window !== "undefined") {
  // @ts-ignore
  window.registerScript = registerScript;
  // @ts-ignore
  window.registerComponent = function (
    pluginName: string,
    Component: React.Component
  ) {
    Components[pluginName] = Component;
  };
  // @ts-ignore
  window.Components = Components;
  // @ts-ignore
  window.require = (name) => {
    if (name === "react") return React;
    return undefined;
  };
}
