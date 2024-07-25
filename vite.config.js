import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/": {
  //       target: "http://localhost:3000",
  //       changeOrigin: true,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
