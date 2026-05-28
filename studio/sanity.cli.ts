import { defineCliConfig } from "sanity/cli";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineCliConfig({
  api: {
    projectId: "aartfjgc",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
});
