import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";

export default defineConfig({
  base: "/after-sandwich-before-js30/Recoil/dist/",
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
