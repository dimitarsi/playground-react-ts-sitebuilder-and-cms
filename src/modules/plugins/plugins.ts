import { Application } from "express";
import { restricted } from "../restricted";

export const PluginsApp = (app: Application) => {
  app.get("/plugins", restricted, (_, res) => {
    res.send("Plugins Area");
  });

  app.delete("/plugins/:id", restricted, (_, res) => {
    res.send("Plugins Area");
  });
};
