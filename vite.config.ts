import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path. Defaults to "/" (root domain). The temporary GitHub Pages preview
  // builds with VITE_BASE=/blue-whale-website-preview/ so assets resolve under the subpath.
  base: process.env.VITE_BASE || "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // The SSR build must land on a PREDICTABLE path, because
        // scripts/prerender.mjs imports dist-ssr/entry-server.js by name. Left to
        // itself Rollup hashes it and the prerender cannot find it.
        ...(process.env.VITE_SSR_BUILD || mode === "ssr"
          ? { entryFileNames: "entry-server.js" }
          : {}),
      },
    },
  },
}));
