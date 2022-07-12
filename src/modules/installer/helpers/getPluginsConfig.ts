import { PluginConfig } from "../types";
import fs from "fs";

export function getPluginsConfig(): PluginConfig {
  let jsonConfig: PluginConfig;
  try {
    const f = fs.readFileSync("./public/plugins.json");
    const data = JSON.parse(f.toString());
    jsonConfig = data as PluginConfig;
  } catch (e) {
    console.error("NO such file found");
    jsonConfig = {
      plugins: [],
    };
  } finally {
    return jsonConfig!;
  }
}
