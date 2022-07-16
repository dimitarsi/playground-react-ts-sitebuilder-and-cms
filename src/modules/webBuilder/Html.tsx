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
        <link href="/web-builder/index.css" rel="stylesheet" />
      </head>
      <body>
        <div id="root"></div>
        <DefineModule />
        <script src="/web-builder/index.js"></script>
      </body>
    </html>
  );
};

export const ServerHtmlStream = () => renderToPipeableStream(<ServerHtml />);
