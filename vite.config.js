import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.js"),
      name: "ESLintPluginReactDataAttribute",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["eslint", "@babel/eslint-parser", "path"],
      output: {
        globals: {
          eslint: "ESLint",
        },
      },
    },
    target: "node18",
  },
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
