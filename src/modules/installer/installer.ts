import { Application } from "express";
import { handler } from "./handler";
import { middleware } from "./middleware";

export const InstallerApp = (app: Application) => {
  app.post("/install", middleware, handler);
};
