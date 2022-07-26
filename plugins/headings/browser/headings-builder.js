"use strict";
{window.Components = window.Components || [];
var Component = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
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

  // src/components/HeadingsBuilder.tsx
  var HeadingsBuilder_exports = {};
  __export(HeadingsBuilder_exports, {
    HeadingsBuilder: () => HeadingsBuilder,
    type: () => type
  });
  var import_react = __toESM(__require("react"));

  // src/components/HeadingsPlugin.json
  var HeadingsPlugin_default = {
    pluginName: "Headings Plugin",
    shortName: "headings",
    group: "typography",
    pluginIcon: [{ size: "32x32", src: "./src/components/heading.svg" }],
    publicComponent: [
      {
        src: "./src/components/H1HeadingBlock.tsx",
        name: "h1",
        componentIcon: [
          { size: "32x32", src: "./src/components/heading-h1-32x32.svg" },
          { size: "64x64", src: "./src/components/heading-h1-64x64.svg" }
        ]
      },
      {
        src: "./src/components/H2HeadingBlock.tsx",
        name: "h2"
      }
    ],
    builderComponent: "./src/components/HeadingsBuilder.tsx"
  };

  // src/components/HeadingsBuilder.tsx
  var HeadingsBuilder = () => {
    return /* @__PURE__ */ import_react.default.createElement("div", null, "Builder");
  };
  var type = HeadingsPlugin_default.shortName;
  return __toCommonJS(HeadingsBuilder_exports);
})();
window.Components.push({plugin: "headings-builder", Component: Component.Component})}
//# sourceMappingURL=headings-builder.js.map
