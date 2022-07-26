import { Application } from "express";
import { ServerHtmlStream } from "./Html";
import express from "express";
import { PLUGINS_CONFIG_PATH } from "../constants";

export const WebBuilderApp = (app: Application) => {
  app.get("/web-builder", (_, res) => {
    ServerHtmlStream().pipe(res);
  });

  app.use("/web-builder", express.static("./dist/web-builder"));

  app.post("/web-builder/save", (_, res) => {
    res.send("Web builder area");
  });

  app.use("/plugins.json", (_, res) => {
    res.sendFile(PLUGINS_CONFIG_PATH);
  });
};
