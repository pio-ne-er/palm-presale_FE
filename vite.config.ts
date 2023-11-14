import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import type { UserConfig as VitesUserConfigInterface } from "vitest/config";

// https://vitejs.dev/config/
const vitestConfig: VitesUserConfigInterface = {
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["src/setupTest.ts"],
  },
};

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: vitestConfig.test,
  server: {
    port: 5000,
    host: "0.0.0.0",
  },
  define: {
    "process.env.ANCHOR_BROWSER": true,
    global: "window",
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
