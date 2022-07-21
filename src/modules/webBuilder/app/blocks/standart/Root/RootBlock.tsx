import React, { PropsWithChildren } from "react";

export const RootBlock = (props: PropsWithChildren) => (
  <React.Fragment>{props.children}</React.Fragment>
);
