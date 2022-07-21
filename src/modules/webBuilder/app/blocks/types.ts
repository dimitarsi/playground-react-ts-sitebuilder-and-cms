import { PropsWithChildren, PropsWithRef, RefAttributes } from "react";

export interface BuilderProps<D> {
  data: D;
  builderTypes: string[];
  PublicComponent: React.ForwardRefExoticComponent<
    PropsWithChildren<D> & RefAttributes<HTMLElement>
  >;
  PublicComponentChildren: React.ComponentType<
    PropsWithChildren<{ id: string }>
  >;
  Footer: React.ComponentType<{ builderTypes: string[]; id: string }>;
}
