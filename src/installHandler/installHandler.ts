import e, { RequestHandler } from "express";
import multer from "multer";
import fs from "fs";

const multerMiddleware = multer({ dest: "./uploads" });

export const middleware = multerMiddleware.single("attachment");
export const installHandler: RequestHandler = (req, res) => {
  console.log(req.files);
  console.log(req.file);
  const pluginsConfig = getPluginsConfig();
  const pluginName = req.query["pluginName"]?.toString();

  if (req.file?.path && pluginName) {
    const finalName = `${req.file.path}.js`;

    fs.renameSync(req.file?.path, finalName);

    pluginsConfig.plugins.push({
      pluginName,
      path: finalName,
    });

    fs.writeFileSync(
      "./public/plugins-config.json",
      JSON.stringify(pluginsConfig)
    );
  } else {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
};

type PluginConfig = {
  plugins: Array<{ pluginName: string; path: string }>;
};

function getPluginsConfig(): PluginConfig {
  let jsonConfig: PluginConfig;
  try {
    const f = fs.readFileSync("./public/plugins-config.json");
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
