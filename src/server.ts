import express, { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import compression from "compression";
import session from "express-session";
import { CmsApp } from "./modules/cms/cms";
import { WebBuilderApp } from "./modules/webBuilder/web-builder";
import { PluginsApp } from "./modules/plugins/plugins";
import { InstallerApp } from "./modules/installer/installer";
import { PublicApp } from "./modules/publicApp/publicApp";

const app = express();

const COOKIE_MAX_AGE_MINITUES = 15;

const maxAge = process.env.COOKIE_MAX_AGE
  ? parseFloat(process.env.COOKIE_MAX_AGE)
  : 1000 * 60 * COOKIE_MAX_AGE_MINITUES;

app.use(compression());

app.use(
  session({
    name: "sesid",
    secret: process.env.COOKIE_SECRET || "restricted-area-" + Math.random(),
    cookie: {
      path: "/",
      httpOnly: true,
      // secure: true,
      sameSite: true,
      maxAge: maxAge,
    },
  })
);

const jsonPostHandler: RequestHandler = (req, res) => {
  const ws = fs.createWriteStream("./public/page-config.json");
  req.pipe(ws);

  res.json({
    status: "ok",
  });
};

app.post("/json", jsonPostHandler);
app.use("/uploads", express.static("./uploads", {}));

app.get("/authorize", (req, res) => {
  console.log(`SessionID: ${req.sessionID}`);

  if (!req.session.authorized) {
    req.session.authorized = 1;
  }

  res.sendStatus(200);
});

CmsApp(app);
WebBuilderApp(app);
PluginsApp(app);
InstallerApp(app);
PublicApp(app);

app.listen(process.env.PORT || "3000", () => {
  console.log("Starting app on");
  console.log(`localhost:${process.env.PORT || "3000"}`);
});
