import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import { pipeline } from "stream";
import Handlebars from "handlebars";

const streamPipeline = promisify(pipeline);

export async function copyTemplateDir(
  srcDir: string,
  destDir: string,
  context: Record<string, any>
) {
  const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    let destFileName = entry.name.replace(/\.hbs$/, "");

    // skip Partials
    if (destFileName === "package.partial.json") {
      continue;
    }

    if (destFileName === "_gitignore") {
      destFileName = ".gitignore";
    }
    const destPath = path.join(destDir, destFileName);

    try {
      if (entry.isDirectory()) {
        await fs.promises.mkdir(destPath, { recursive: true });
        await copyTemplateDir(srcPath, destPath, context);
      } else {
        if (entry.name.endsWith(".hbs")) {
          const raw = await fs.promises.readFile(srcPath, "utf8");
          const compiled = Handlebars.compile(raw);
          const result = compiled(context);
          await fs.promises.writeFile(destPath, result, "utf8");
        } else {
          await streamPipeline(
            fs.createReadStream(srcPath),
            fs.createWriteStream(destPath)
          );
        }
      }
    } catch (err) {
      console.error(`Error copying ${srcPath} to ${destPath}:`, err);
      throw err;
    }
  }
}
