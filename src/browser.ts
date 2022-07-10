import React from "react";
// @ts-ignore
window.module = { exports: null };

function registerScript(pluginName: string, pluginPath: string) {
  const scrpt = document.createElement("script");
  scrpt.src = pluginPath;
  document.body.appendChild(scrpt);
}

if (typeof window !== "undefined") {
  // @ts-ignore
  window.require = (name) => {
    if (name === "react") return React;
    return undefined;
  };
}
