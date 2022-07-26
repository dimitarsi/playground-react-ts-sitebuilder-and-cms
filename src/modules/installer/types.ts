interface ManifestData {
  browserEntries: Record<string, string>;
  serverEntries: Record<string, string>;
  pluginName: string;
  shortName: string;
  version: string;
}
type PluginName = string;

export type PluginConfig = {
  plugins: Record<PluginName, ManifestData>;
};
