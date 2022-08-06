import React, { PropsWithChildren } from "react";
import { Data } from "./types";
export const GridBlock = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<Data>
>(function GridBlock({ data, children }, ref) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: data.direction,
        gap: `${data.gap}px`,
        justifyContent: data.align,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
});
