import e from "express";
import React, { useEffect, useState } from "react";

export const Component = () => {
  const handleClick = () => {
    console.log("Component hydrated succesfully");
  };
  const title = "foobar";

  return <h1 onClick={handleClick}>{title}</h1>;
};

if (typeof window !== "undefined") {
  console.log("title", Component);
  // @ts-ignore
  window.registerComponent?.("title", Component);
}
