import React from "react";
import { Data } from "./types";
export const TextBlock = React.forwardRef<HTMLParagraphElement, Data>(
  function TextBlock({ data }, ref) {
    return <p ref={ref} dangerouslySetInnerHTML={{ __html: data }} />;
  }
);
