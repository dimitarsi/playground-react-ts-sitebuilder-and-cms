import fs from "fs";
import ps from "child_process";
import path from "path";
import { RequestHandler } from "express";
import { getPluginDir, PLUGINS_PATH } from "../constants";
import { ManifestData } from "../../plugin.types";
import { PLUGINS_CONFIG_PATH } from "../constants";

export const handler: RequestHandler = async (req, res) => {
  if (req.file?.path) {
    // TODO: Add parameter support for overwrite
    // if (fs.existsSync(`./${PLUGINS_DIR}/${pluginName}/`)) {
    //   fs.rmSync(`./${PLUGINS_DIR}/${pluginName}`, {
    //     recursive: true,
    //   });
    // }

    const uploadFile = req.file.path;
    const pluginName = path
      .basename(req.file.originalname, path.extname(req.file.originalname))
      .toLocaleLowerCase()
      .replace(/[\. ]/, "-");

    const targetDir = getPluginDir(pluginName);
    const moveFrom = `${targetDir}/build/*`;
    const moveTo = targetDir;
    const buildDirFromZip = `${targetDir}/build`;

    ps.exec(`unzip ${uploadFile} -d ${targetDir}`, async (err) => {
      console.log(err);
      if (!err) {
        await normalizePluginStructure({
          moveFrom,
          moveTo,
          buildDirFromZip,
        });

        const writeSuccessful = appendManifestToConfig(pluginName);
        if (writeSuccessful) {
          res.redirect(302, "/install-success");
        } else {
          res.redirect(302, "/install-fail");
        }
      } else {
        res.sendStatus(500);
      }
    });
  } else {
    res.sendStatus(404);
    return;
  }
};

function normalizePluginStructure({
  moveFrom,
  moveTo,
  buildDirFromZip,
}: {
  moveFrom: string;
  moveTo: string;
  buildDirFromZip: string;
}) {
  return new Promise((res, reject) => {
    if (fs.existsSync(buildDirFromZip)) {
      ps.exec(`mv ${moveFrom} ${moveTo} && rmdir ${buildDirFromZip}`, (err) => {
        if (err) {
          console.error(err);
          reject();
        }
        res(true);
      });
    } else {
      res(true);
    }
  });
}

function appendManifestToConfig(pluginName: string) {
  let pluginConfig = {
    plugins: {},
  };
  try {
    const config = fs.readFileSync(PLUGINS_CONFIG_PATH).toString();
    pluginConfig = JSON.parse(config);
  } catch (err) {
    console.log("Error getting config info. Fallback to empty config");
  }

  const pluginManifest: ManifestData = JSON.parse(
    fs
      .readFileSync(path.join(PLUGINS_PATH, pluginName, "./manifest.json"))
      .toString()
  );

  // @ts-ignore
  if (pluginConfig.plugins[pluginName]) {
    return false;
  }

  // @ts-ignore
  pluginConfig.plugins[pluginName] = pluginManifest;

  fs.writeFileSync(PLUGINS_CONFIG_PATH, JSON.stringify(pluginConfig));

  return true;
}
