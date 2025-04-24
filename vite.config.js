import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

function fileName(format, entryName) {
  switch (format) {
    case "es":
      return `${entryName}.mjs`;
    case "cjs":
      return `${entryName}.cjs`;
    default:
      return `${entryName}.js`;
  }
}

export default defineConfig({
  build: {
    minify: false,
    target: "es2023",
    lib: {
      entry: "src/index.ts",
      name: "async-iterator-utilities",
      formats: ["es", "cjs"],
      fileName,
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
