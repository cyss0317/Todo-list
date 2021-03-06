import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    // reactRefresh(),
    react(),
    tsconfigPaths(),
  ],
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), "/nix/store/"],
    },
  },
});
