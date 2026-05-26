import { copyFileSync, existsSync, renameSync, rmSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const appHtml = path.join(distDir, "app.html");
const indexHtml = path.join(distDir, "index.html");

if (existsSync(appHtml)) {
  if (existsSync(indexHtml)) {
    rmSync(indexHtml, { force: true });
  }
  renameSync(appHtml, indexHtml);
}

if (!existsSync(indexHtml)) {
  throw new Error("dist/index.html was not generated");
}

copyFileSync(indexHtml, path.resolve("index.html"));
