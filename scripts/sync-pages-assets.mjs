import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import path from "node:path";

const distAssetsDir = path.resolve("dist", "assets");
const rootAssetsDir = path.resolve("assets");

if (!existsSync(distAssetsDir)) {
  throw new Error("dist/assets was not generated");
}

const copyDirectory = (sourceDir, targetDir) => {
  mkdirSync(targetDir, { recursive: true });

  for (const entry of readdirSync(sourceDir)) {
    const sourcePath = path.join(sourceDir, entry);
    const targetPath = path.join(targetDir, entry);
    const stats = statSync(sourcePath);

    if (stats.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
      continue;
    }

    copyFileSync(sourcePath, targetPath);
  }
};

rmSync(rootAssetsDir, { recursive: true, force: true });
copyDirectory(distAssetsDir, rootAssetsDir);
