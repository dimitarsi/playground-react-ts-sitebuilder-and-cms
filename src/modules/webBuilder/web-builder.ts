import { Application } from "express";
import { restricted } from "../restricted";
import { ServerHtmlStream } from "./Html";
import express from "express";

export const WebBuilderApp = (app: Application) => {
  app.get("/web-builder", (_, res) => {
    ServerHtmlStream().pipe(res);
  });

  app.use("/web-builder", express.static("./dist/web-builder"));

  app.post("/web-builder/save", (_, res) => {
    res.send("Web builder area");
  });
};
