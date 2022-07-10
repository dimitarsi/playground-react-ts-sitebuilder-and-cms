import React from "react";

export const Component = () => {
  return <div>Hello World</div>;
};

if (typeof window !== "undefined") {
  // @ts-ignore
  window.registerComponent("paragraph", Component);
}
