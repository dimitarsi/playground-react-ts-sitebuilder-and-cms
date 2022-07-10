import { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";

const App = (props: {
  json: any;
  plugins: Array<{ path: string; pluginName: string }>;
}) => {
  return (
    <>
      <h1>Hello World</h1>
      <div id="app">
        {props.plugins.map((p) => {
          const pluginPath = path.join(process.cwd(), p.path);
          console.log(process.cwd());
          console.log(`File Exists? ${pluginPath}`, fs.existsSync(pluginPath));

          const Component =
            require(pluginPath).Component || require(pluginPath).Component3;
          return <Component key={p.pluginName} />;
        })}
      </div>
      <script src="/browser.js"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: props.plugins
            .map((p) => {
              return `registerScript('${p.pluginName}', '/${p.path}')`;
            })
            .join("\n;"),
        }}
      ></script>
      <script src="/client.js"></script>
    </>
  );
};

export const reactHandler: RequestHandler = (req, res) => {
  const pageConfig = fs.readFileSync("./public/page-config.json");
  const { plugins } = JSON.parse(
    fs.readFileSync("./public/plugins-config.json").toString()
  );
  res.write("<!DOCTYPE html><head></head><body>");
  renderToPipeableStream(<App json={pageConfig} plugins={plugins} />).pipe(res);
};
