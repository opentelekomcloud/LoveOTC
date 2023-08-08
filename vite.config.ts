import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      ecma: 2020,
      module: true,
    },
    reportCompressedSize: false,
    modulePreload: {
      polyfill: false,
    }
  },
})