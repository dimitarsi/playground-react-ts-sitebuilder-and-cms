interface PluginData {
  /**
   * Path to browser entry javascript file, relative to the upload/storage folder
   */
  browserEntry: string;
  /**
   * Path to server entry javascript file, relative to the upload/storage folder
   */
  serverEntry: string;
  pluginName: string;
}

interface PluginJSONData {
  plugins: PluginData[];
}
