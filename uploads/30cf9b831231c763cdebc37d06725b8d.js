"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/title.tsx
var title_exports = {};
__export(title_exports, {
  Component: () => Component
});
module.exports = __toCommonJS(title_exports);
var import_react = __toESM(require("react"));
var Component = () => {
  const handleClick = () => {
    console.log("Component hydrated succesfully");
  };
  const title = "foobar";
  return /* @__PURE__ */ import_react.default.createElement("h1", {
    onClick: handleClick
  }, title);
};
var _a;
if (typeof window !== "undefined") {
  console.log("title", Component);
  (_a = window.registerComponent) == null ? void 0 : _a.call(window, "title", Component);
}
//# sourceMappingURL=title.js.map
