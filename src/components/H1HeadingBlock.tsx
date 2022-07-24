import React, { FC, PropsWithChildren } from "react";
import { HeadingType } from "./types";
import { Wrapper } from "./Wrapper";

export const Component: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <h1>{children}</h1>
    </Wrapper>
  );
};

export const type: HeadingType = "heading-h1";
