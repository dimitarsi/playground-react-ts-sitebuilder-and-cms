const ps = require("child_process");
const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const pluginFile = process.argv[3];
const pluginName = process.argv[2];
const pluginFileBaseName = path.basename(pluginFile, path.extname(pluginFile));

async function build() {
  const buildBrowser = esbuild.build({
    outdir: "./build/browser",
    platform: "browser",
    sourcemap: true,
    external: ["react", "react-dom"],
    format: "iife",
    sourceRoot: "./src",
    bundle: true,
    entryPoints: [pluginFile],
    globalName: "Component",
    banner: {
      js: `{window.Components = window.Components || [];`,
    },
    footer: {
      js: `window.Components.push({plugin: '${pluginName}', Component: Component.Component})}`,
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
    entryPoints: [pluginFile],
  });

  const [browserBuild, serverBuild] = await Promise.all([
    buildBrowser,
    buildServer,
  ]);

  await fs.writeFileSync(
    "./build/manifest.json",
    JSON.stringify({
      browserEntry: `./${pluginName}/browser/${pluginFileBaseName}.js`,
      serverEntry: `./${pluginName}/node/${pluginFileBaseName}.js`,
      pluginName: pluginName,
    })
  );

  ps.exec("zip -r build.zip ./build/*", (er) => {
    console.error(er);
    // fs.rmSync("./build", { recursive: true });
  });
}

build();
