import { RequestHandler } from "express";
import { getPluginsConfig } from "./helpers/getPluginsConfig";
import path from "path";
import fs from "fs";
import ps from "child_process";

export const handler: RequestHandler = async (req, res) => {
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
