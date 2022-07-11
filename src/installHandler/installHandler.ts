import { RequestHandler } from "express";
import multer from "multer";
import fs from "fs";
import ps from "child_process";
import path from "path";

const multerMiddleware = multer({ dest: "./uploads" });

export const middleware = multerMiddleware.single("attachment");
export const installHandler: RequestHandler = async (req, res) => {
  const pluginsConfig = getPluginsConfig();
  const pluginName = req.query["pluginName"]?.toString();

  if (req.file?.path && pluginName) {
    const finalName = `${req.file.path}.zip`;

    await fs.renameSync(req.file?.path, finalName);
    ps.exec(
      `unzip ${finalName} -d ./uploads/${pluginName}/ && mv ./uploads/${pluginName}/build/* ./uploads/${pluginName}/ && rmdir ./uploads/${pluginName}/build`,
      (err) => {
        console.log(err);

        if (!err) {
          const pluginManifestFile = path.join(
            process.cwd(),
            `./uploads/${pluginName}/manifest.json`
          );

          const pluginManifest = JSON.parse(
            fs.readFileSync(pluginManifestFile).toString()
          );

          pluginsConfig.plugins.push(pluginManifest);

          fs.writeFileSync(
            "./public/plugins.json",
            JSON.stringify(pluginsConfig)
          );

          res.sendStatus(204);
          return;
        } else {
          res.sendStatus(500);
        }
      }
    );
  } else {
    res.sendStatus(404);
    return;
  }
};

type PluginConfig = {
  plugins: Array<{ pluginName: string; path: string }>;
};

function getPluginsConfig(): PluginConfig {
  let jsonConfig: PluginConfig;
  try {
    const f = fs.readFileSync("./public/plugins.json");
    const data = JSON.parse(f.toString());
    jsonConfig = data as PluginConfig;
  } catch (e) {
    console.error("NO such file found");
    jsonConfig = {
      plugins: [],
    };
  } finally {
    return jsonConfig!;
  }
}
