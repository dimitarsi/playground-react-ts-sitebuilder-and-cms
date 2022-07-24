import ps from "child_process";
import esbuild, { BuildOptions } from "esbuild";
import fs from "fs";
import {
  ManifestData,
  Path,
  PluginConfig,
  PublicComponent,
} from "./plugin.types";

const BUILDER_DEFAULT_NAME = "builder";

function componentExists(
  component: PublicComponent | PublicComponent[] | Path<any> | undefined
): boolean {
  if (!component) {
    return false;
  }

  if (Array.isArray(component)) {
    return component.every(componentExists);
  }

  if (typeof component !== "string") {
    return fs.existsSync(component.src);
  }

  return fs.existsSync(component);
}

function resolvePublic(toSolve: PublicComponent | PublicComponent[]) {
  if (Array.isArray(toSolve)) {
    return toSolve;
  }
  return [toSolve];
}

function readFromConfig() {
  const configFile = process.argv[2];

  if (fs.existsSync(configFile)) {
    try {
      const data: PluginConfig = JSON.parse(
        fs.readFileSync(configFile).toString()
      );

      if (!data.pluginName) {
        console.error(`Invalid plugin name from config file.`);
      }

      if (!componentExists(data.publicComponent)) {
        console.error(`Invalid public component from config file.`);
      }

      if (!componentExists(data.builderComponent)) {
        console.error(`Invalid builder component from config file.`);
      }

      return data;
    } catch (e) {
      console.error(`${configFile} cannot be parsed.`);
    }
  }

  throw `Invalid plugin config file. ${configFile} file does not exist`;
}

const defaultClientOptions: Partial<BuildOptions> = {
  platform: "browser",
  sourcemap: true,
  external: ["react", "react-dom"],
  sourceRoot: "./src",
  bundle: true,
  globalName: "Component",
  // TODO: research spliting the bundles
  splitting: false,
  format: "iife",
  banner: {
    js: `{window.Components = window.Components || [];`,
  },
};

function buildClient(
  c: {
    name: string;
    src: Path<any>;
  },
  config: PluginConfig
): Promise<esbuild.BuildResult> {
  const outName = `${config.shortName}-${c.name}`;
  return esbuild.build({
    ...defaultClientOptions,
    entryPoints: [c.src],
    outfile: `./build/browser/${outName}.js`,
    footer: {
      js: `window.Components.push({plugin: "${outName}", Component: Component.Component})}`,
    },
  });
}

function buildNode(
  c: PublicComponent,
  config: PluginConfig
): Promise<esbuild.BuildResult> {
  const outName = `${config.shortName}-${c.name}`;
  return esbuild.build({
    outfile: `./build/node/${outName}.js`,
    platform: "node",
    sourcemap: true,
    external: ["react", "react-dom"],
    format: "cjs",
    sourceRoot: "./src",
    bundle: true,
    entryPoints: [c.src],
  });
}

async function build() {
  const config = readFromConfig();
  const { pluginName, builderComponent, publicComponent } = config;
  const components = resolvePublic(publicComponent);
  const publicComponents = components.map(({ src }) => src);
  const buildBrowser: Array<Promise<esbuild.BuildResult>> = [
    buildClient(
      {
        name: BUILDER_DEFAULT_NAME,
        src: builderComponent,
      },
      config
    ),
  ];
  const buildServer: Array<Promise<esbuild.BuildResult>> = [];

  components.forEach((c) => {
    buildBrowser.push(buildClient(c, config));
    buildServer.push(buildNode(c, config));
  });

  await Promise.all([...buildBrowser, ...buildServer]);

  /**
   * @type PluginJSONData
   * @see /types/plugind.d.ts
   */
  const manifest: ManifestData = {
    browserEntries: components.reduce((acc, c) => {
      const outName = `${config.shortName}-${c.name}`;
      return {
        ...acc,
        [outName]: `./browser/${outName}.js`,
      };
    }, {}),
    serverEntries: components.reduce((acc, c) => {
      const outName = `${config.shortName}-${c.name}`;
      return {
        ...acc,
        [outName]: `./node/${outName}.js`,
      };
    }, {}),
    pluginName: pluginName,
    shortName: config.shortName,
    version: "1.0.0",
  };
  manifest.browserEntries[
    `${config.shortName}-${BUILDER_DEFAULT_NAME}`
  ] = `./browser/${config.shortName}-${BUILDER_DEFAULT_NAME}.js`;

  await fs.writeFileSync("./build/manifest.json", JSON.stringify(manifest));

  // ps.exec(`zip -r ${pluginName}.zip ./build/*`, (er: any) => {
  //   console.error(er);
  //   // fs.rmSync("./build", { recursive: true });
  // });
}

build();
