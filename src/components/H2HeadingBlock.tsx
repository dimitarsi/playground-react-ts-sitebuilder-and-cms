import React, { FC, PropsWithChildren } from "react";
import { HeadingType } from "./types";
import { Wrapper } from "./Wrapper";

export const Component: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <h2>{children}</h2>
    </Wrapper>
  );
};

export const type: HeadingType = "heading-h2";
