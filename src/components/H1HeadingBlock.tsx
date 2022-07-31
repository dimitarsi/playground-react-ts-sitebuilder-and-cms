import React, { FC, PropsWithChildren } from "react";
import { HeadingType } from "./types";
import { Wrapper } from "./Wrapper";

export const Component: FC<{ data: string }> = ({ data }) => {
  return (
    <Wrapper>
      <h1>{data}</h1>
    </Wrapper>
  );
};

export const type: HeadingType = "heading-h1";
