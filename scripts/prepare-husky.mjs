import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

// Git hooks are for local development only; skip in CI and hosted builds.
if (process.env.CI || process.env.NETLIFY || process.env.HUSKY === "0") {
  process.exit(0);
}

const huskyBin = join(process.cwd(), "node_modules", "husky", "bin.js");
if (!existsSync(huskyBin)) {
  process.exit(0);
}

execSync(`node "${huskyBin}"`, { stdio: "inherit" });
