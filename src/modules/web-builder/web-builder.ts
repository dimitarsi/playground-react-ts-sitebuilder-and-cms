import { Application } from "express";
import { restricted } from "../restricted";

export const WebBuilderApp = (app: Application) => {
  app.get("/web-builder", restricted, (_, res) => {
    res.send("Web builder area");
  });

  app.post("/web-builder/save", restricted, (_, res) => {
    res.send("Web builder area");
  });
};
