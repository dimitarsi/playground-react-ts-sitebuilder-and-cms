import express from "express";
import { Application } from "express";
import { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";

const App = (props: {
  json: any;
  plugins: Array<{
    browserEntry: string;
    serverEntry: string;
    pluginName: string;
  }>;
}) => {
  return (
    <html>
      <head></head>
      <body>
        <div id="app">
          {props.plugins.map((p) => {
            const pluginPath = path.join(
              process.cwd(),
              "./uploads",
              p.serverEntry
            );
            const Component = require(pluginPath).Component;
            return <Component key={p.pluginName} />;
          })}
        </div>
        <script src="/browser.js"></script>
        <script src="/plugins.js"></script>
        <script src="/client.js"></script>
      </body>
    </html>
  );
};

const reactHandler: RequestHandler = (req, res) => {
  const pageConfig = fs.readFileSync("./public/page-config.json");

  const { plugins } = JSON.parse(
    fs.readFileSync("./public/plugins.json").toString()
  );

  res.write("<!DOCTYPE html>");
  renderToPipeableStream(<App json={pageConfig} plugins={plugins} />).pipe(res);
};

export const PublicApp = (app: Application) => {
  app.get("/app", reactHandler);

  app.use(express.static("./dist/client"));
};
