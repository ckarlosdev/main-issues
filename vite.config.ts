import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = "main-issues";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
});
