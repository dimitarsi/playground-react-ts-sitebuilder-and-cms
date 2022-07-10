const ps = require("child_process");
const esbuild = require("esbuild");
const fs = require("fs");

const pluginFiles = process.argv.slice(3);
const pluginName = process.argv[2];

async function build() {
  const buildBrowser = esbuild.build({
    outdir: "./build/browser",
    platform: "browser",
    sourcemap: true,
    external: ["react", "react-dom"],
    format: "iife",
    sourceRoot: "./src",
    bundle: true,
    entryPoints: pluginFiles,
    globalName: "Component",
    banner: {
      js: `{window.Components = window.Components || [];`,
    },
    footer: {
      js: `window.Components.push({plugin: '${pluginName}', Component: Component})}`,
    },
  });

  const buildServer = esbuild.build({
    outdir: "./build/node",
    platform: "node",
    sourcemap: true,
    external: ["react", "react-dom"],
    format: "cjs",
    sourceRoot: "./src",
    bundle: true,
    entryPoints: pluginFiles,
  });

  await Promise.all([buildBrowser, buildServer]);

  ps.exec("zip -rj build.zip ./build/*", () => {
    fs.rmSync("./build", { recursive: true });
  });
}

build();
