import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "esnext",
    reportCompressedSize: false,
    modulePreload: {
      polyfill: false,
    }
  },
});
