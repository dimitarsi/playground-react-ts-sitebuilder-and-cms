import { Application } from "express";
import { handler } from "./handler";
import { middleware } from "./middleware";
import path from "path";

export const InstallerApp = (app: Application) => {
  app.post("/install", middleware, handler);
  app.get("/install", (_, res) => {
    const pathToHtml = path.join(
      process.cwd(),
      "./public/plugins/install.html"
    );
    res.sendFile(pathToHtml);
  });
};
