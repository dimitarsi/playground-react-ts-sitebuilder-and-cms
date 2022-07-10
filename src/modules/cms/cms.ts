import { Application } from "express";
import { restricted } from "../restricted";

export const CmsApp = (app: Application) => {
  app.get("/cms", restricted, (_, res) => {
    res.send("CMS Area");
  });
};
