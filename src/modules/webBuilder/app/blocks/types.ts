import {
  ComponentType,
  PropsWithChildren,
  PropsWithRef,
  RefAttributes,
} from "react";

export interface BuilderProps<D> {
  data: D;
  builderTypes: string[];
  PublicComponent:
    | ComponentType<D>
    | React.ForwardRefExoticComponent<
        PropsWithChildren<D> & RefAttributes<HTMLElement>
      >;
  PublicComponentChildren: React.ComponentType<
    PropsWithChildren<{ id: string }>
  >;
  Footer: React.ComponentType<{
    builderTypes: string[];
    id: string;
  }>;
}
