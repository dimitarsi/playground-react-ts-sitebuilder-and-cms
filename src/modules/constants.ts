import path from "path";
export const UPLOADS_DIR_NAME = "uploads";
export const PLUGINS_DIR_NAME = "plugins";

export const UPLOADS_PATH = path.join(process.cwd(), UPLOADS_DIR_NAME);
export const PLUGINS_PATH = path.join(process.cwd(), PLUGINS_DIR_NAME);

export const PLUGINS_CONFIG_PATH = path.join(PLUGINS_PATH, "config.json");

export const getPluginDir = (shortName: string) =>
  path.join(PLUGINS_PATH, shortName);

export const getManifestPath = (shortName: string) =>
  path.join(PLUGINS_PATH, shortName, "manifest.json");
