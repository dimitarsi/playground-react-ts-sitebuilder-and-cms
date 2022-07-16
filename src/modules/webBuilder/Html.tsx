import React from "react";
import { renderToPipeableStream } from "react-dom/server";

const DefineModule = () => (
  <script dangerouslySetInnerHTML={{ __html: "window.module = {}" }}></script>
);

export const ServerHtml = () => {
  return (
    <html>
      <head>
        <title>Web Builder</title>
      </head>
      <body>
        <div id="app"></div>
        <DefineModule />
        <script src="/web-builder/app.js"></script>
      </body>
    </html>
  );
};

export const ServerHtmlStream = () => renderToPipeableStream(<ServerHtml />);
