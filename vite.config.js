import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "ace-builds": path.resolve(__dirname, "./node_modules/ace-builds"),
    },
  },
  base: "/node_modules/ace-builds/src-noconflict/",
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/assets/[name]-[hash].[ext]",
      },
    },
  },
});
