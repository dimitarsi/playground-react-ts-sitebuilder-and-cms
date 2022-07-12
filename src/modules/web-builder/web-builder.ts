import { Application } from "express";
import { restricted } from "../restricted";
import path from "path";
import esbuild from "esbuild";
import http from "http";

const ESBUILD_PORT = parseFloat(process.env.SERVE_PORT || "5555");
const ESBUILD_OUTFILE = "app.js";

export const WebBuilderApp = (app: Application) => {
  if (process.argv.includes("--dev")) {
    esbuild.serve(
      {
        host: "localhost",
        port: ESBUILD_PORT,
      },
      {
        entryPoints: [
          path.join(
            process.cwd(),
            "./src/modules/web-builder/components/app.tsx"
          ),
        ],
        bundle: true,
        outfile: ESBUILD_OUTFILE,
        sourcemap: true,
        sourceRoot: path.join(process.cwd(), "./src"),
      }
    );
    // proxy the request
    app.get("/web-builder/app.js", async (_, proxyRes) => {
      http.get(`http://localhost:${ESBUILD_PORT}/${ESBUILD_OUTFILE}`, (res) => {
        console.log(
          "Start piping - ",
          `http://localhost:${ESBUILD_PORT}/${ESBUILD_OUTFILE}`
        );
        res.pipe(proxyRes);
      });
    });
  }

  app.get("/web-builder", restricted, (_, res) => {
    res.sendFile(path.join(process.cwd(), "./public/web-builder.html"));
  });

  app.post("/web-builder/save", restricted, (_, res) => {
    res.send("Web builder area");
  });
};
