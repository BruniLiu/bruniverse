import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.glb"],
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, "index.html"),
        main: path.resolve(__dirname, "main.html"),
        chat: path.resolve(__dirname, "chat.html"),
        "about-us": path.resolve(__dirname, "about-us.html"),
        "sdg-goals": path.resolve(__dirname, "sdg-goals.html"),
        "reference-list": path.resolve(__dirname, "reference-list.html"),
        "act-now": path.resolve(__dirname, "act-now.html"),
        "act-now-transport": path.resolve(__dirname, "act-now-transport.html"),
        "act-now-vegetables": path.resolve(__dirname, "act-now-vegetables.html"),
        "act-now-travel": path.resolve(__dirname, "act-now-travel.html"),
        "act-now-4r": path.resolve(__dirname, "act-now-4r.html"),
        "sdg-2": path.resolve(__dirname, "sdg-2.html"),
        "sdg-4": path.resolve(__dirname, "sdg-4.html"),
        "sdg-13": path.resolve(__dirname, "sdg-13.html"),
        "sdg-16": path.resolve(__dirname, "sdg-16.html"),
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8787",
    },
  },
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "src/components"),
      "@/lib": path.resolve(__dirname, "lib"),
      "@": path.resolve(__dirname, "."),
    },
  },
});
