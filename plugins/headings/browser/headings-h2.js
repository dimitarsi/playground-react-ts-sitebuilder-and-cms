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

  // src/components/H2HeadingBlock.tsx
  var H2HeadingBlock_exports = {};
  __export(H2HeadingBlock_exports, {
    Component: () => Component,
    type: () => type
  });
  var import_react2 = __toESM(__require("react"));

  // src/components/Wrapper.tsx
  var import_react = __toESM(__require("react"));
  var Wrapper = ({ children }) => {
    return /* @__PURE__ */ import_react.default.createElement("div", null, children);
  };

  // src/components/H2HeadingBlock.tsx
  var Component = ({ children }) => {
    return /* @__PURE__ */ import_react2.default.createElement(Wrapper, null, /* @__PURE__ */ import_react2.default.createElement("h2", null, children));
  };
  var type = "heading-h2";
  return __toCommonJS(H2HeadingBlock_exports);
})();
window.Components.push({plugin: "headings-h2", Component: Component.Component})}
//# sourceMappingURL=headings-h2.js.map
