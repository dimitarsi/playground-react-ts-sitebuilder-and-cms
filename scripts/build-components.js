const ps = require("child_process");
const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");
// const { addCliParam, getVal } = require("./cli-parser");

// const pluginFile = process.argv[3];
// const pluginName = process.argv[2];
// const pluginFileBaseName = path.basename(pluginFile, path.extname(pluginFile));

// addCliParam("--publicComponent", "-p", "Source code for the public component");
// addCliParam(
//   "--builderComponent",
//   "-b",
//   "Source code for the builder component"
// );
// addCliParam("--pluginName", "-n", "Plugin name, it should be unique");

function readFromConfig() {
  const configFile = process.argv[2];
  const defaultConfig = {
    pluginName: "",
    publicComponent: "",
    builderComponent: "",
  };
  if (fs.existsSync(configFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(configFile));

      if (!data.pluginName) {
        console.error(`Invalid plugin name from config file.`);
      }

      if (!data.publicComponent || !fs.existsSync(data.publicComponent)) {
        console.error(`Invalid public component from config file.`);
      }

      if (!data.builderComponent || !fs.existsSync(data.builderComponent)) {
        console.error(`Invalid builder component from config file.`);
      }

      return {
        ...defaultConfig,
        ...data,
      };
    } catch (e) {
      console.error(`${configFile} cannot be parsed.`);
    }
  }

  return defaultConfig;
}

async function build() {
  const config = readFromConfig();
  const { pluginName, builderComponent, publicComponent } = config;
  const pluginFileBaseName = path.basename(
    publicComponent,
    path.extname(publicComponent)
  );

  const buildBrowser = esbuild.build({
    outdir: "./build/browser",
    platform: "browser",
    sourcemap: true,
    external: ["react", "react-dom"],
    format: "iife",
    sourceRoot: "./src",
    bundle: true,
    entryPoints: [publicComponent, builderComponent],
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
    entryPoints: [publicComponent],
  });

  await Promise.all([buildBrowser, buildServer]);
  /**
   * @type PluginJSONData
   * @see /types/plugind.d.ts
   */
  const manifest = {
    browserEntry: `./${pluginName}/browser/${pluginFileBaseName}.js`,
    serverEntry: `./${pluginName}/node/${pluginFileBaseName}.js`,
    pluginName: pluginName,
  };

  await fs.writeFileSync("./build/manifest.json", JSON.stringify(manifest));

  ps.exec(`zip -r ${pluginName}.zip ./build/*`, (er) => {
    console.error(er);
    // fs.rmSync("./build", { recursive: true });
  });
}

build();
