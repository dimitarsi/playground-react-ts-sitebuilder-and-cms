import { ComponentType, PropsWithChildren, RefAttributes } from "react";

export type BuilderFooter = React.ComponentType<{
  allowedPublicTypes: string[];
  id: string;
}>;

export interface BuilderProps<D> {
  data: D;
  allPublicTypes: string[];
  PublicComponent:
    | ComponentType<D>
    | React.ForwardRefExoticComponent<
        PropsWithChildren<D> & RefAttributes<HTMLElement>
      >;
  PublicComponentChildren: React.ComponentType<
    PropsWithChildren<{ id: string }>
  >;
  Footer: BuilderFooter;
  onComponentUpdate: (data: Partial<D>) => void;
}
