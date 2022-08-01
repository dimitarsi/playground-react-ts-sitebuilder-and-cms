import { Application } from "express";
import { restricted } from "../restricted";
import path from "path";
import fs from "fs";

export const PluginsApp = (app: Application) => {
  app.get("/plugins", restricted, (req, res) => {
    if (req.headers["accept"]?.includes("application/json")) {
      const pluginsConfig = fs.readFileSync("./plugins/config.json").toString();
      const plugins = JSON.parse(pluginsConfig).plugins;

      res.json({
        names: Object.keys(plugins),
      });
    } else {
      res.sendFile(path.join(process.cwd(), "./public/plugins/list.html"));
    }
  });

  app.delete("/plugins/:id", restricted, (_, res) => {
    res.send("Plugins Area");
  });
};
