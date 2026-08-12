import { defineConfig } from "vite";

export default defineConfig({
  root: "public",

  publicDir: false,

  build: {
    outDir: "../dist",
    emptyOutDir: true
  },

  server: {
    port: 5173,

    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});