import React, { FC, PropsWithChildren } from "react";
import { HeadingType } from "./types";
import { Wrapper } from "./Wrapper";

export const Component: FC<{ data: string }> = ({ data }) => {
  return (
    <Wrapper>
      <h2>{data}</h2>
    </Wrapper>
  );
};

export const type: HeadingType = "heading-h2";
