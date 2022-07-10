import express, { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import { installHandler, middleware } from "./installHandler/installHandler";
import { reactHandler } from "./reactHandler/reactHandler";
import compression from "compression";

const app = express();

app.use(compression());

const jsonPostHandler: RequestHandler = (req, res) => {
  const ws = fs.createWriteStream("./public/page-config.json");
  req.pipe(ws);

  res.json({
    status: "ok",
  });
};

app.post("/json", jsonPostHandler);
app.get("/app", reactHandler);
app.post("/install", middleware, installHandler);
app.use("/uploads", express.static("./uploads", {}));

app.use("/browser.js", (_, res) => {
  res.sendFile(path.join(process.cwd(), "./dist/browser.js"));
});
app.use("/client.js", (_, res) => {
  res.sendFile(path.join(process.cwd(), "./dist/client.js"));
});
app.use("/plugins.json", (_, res) => {
  res.sendFile(path.join(process.cwd(), "./public/plugins-config.json"));
});

app.listen(process.env.PORT || "3000", () => {
  console.log("Starting app on");
  console.log(`localhost:${process.env.PORT || "3000"}`);
});
