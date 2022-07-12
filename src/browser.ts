import React from "react";
// @ts-ignore
window.module = { exports: null };

if (typeof window !== "undefined") {
  // @ts-ignore
  window.require = (name) => {
    if (name === "react") return React;
    return undefined;
  };
}
