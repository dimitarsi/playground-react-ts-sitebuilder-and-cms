import React, { PropsWithChildren, useState } from "react";
import { BuilderTextBlockState } from "./BuilderTextBlock";

export const TextBlock = (
  props: PropsWithChildren<{
    data: { data: string };
    state: BuilderTextBlockState;
  }>
) => {
  const [data] = useState(props.data.data);
  return (
    <p
      contentEditable={props.state?.edit}
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
};
