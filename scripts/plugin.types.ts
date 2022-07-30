export type Path<T extends string> = `${"./" | "../"}${string}.${T}`;

export interface IconData {
  size: `${number}x${number}`;
  src: Path<"svg" | "jpg" | "png">;
}

export interface PublicComponent {
  src: Path<"ts" | "tsx" | "js" | "jsx" | "mjs">;
  name: "h1";
  componentIcon: IconData | IconData[];
}

export interface PluginConfig {
  pluginName: string;
  shortName: string;
  group: string;
  pluginIcon: IconData[] | IconData;
  publicComponent: PublicComponent | PublicComponent[];
  builderComponent: Path<"ts" | "tsx" | "js" | "jsx" | "mjs">;
  external?: string[];
}

export interface ManifestData {
  browserEntries: Record<string, Path<"js">>;
  serverEntries: Record<string, Path<"js">>;
  pluginName: string;
  shortName: string;
  version: string;
}

export interface PluginsJSONData {
  plugins: Record<string, ManifestData>;
}
