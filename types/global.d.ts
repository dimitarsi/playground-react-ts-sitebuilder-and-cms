import React from "react";

declare global {
  interface Window {
    r: typeof React["createElement"];
    fr: typeof React.Fragment;
    require: (packageName: string) => any;
    Components: Array<{
      plugin: string;
      Component: React.COmponentType<any>;
    }>;
  }
}
