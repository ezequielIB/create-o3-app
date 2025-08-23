import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"], // or ["cjs","esm"] if you want dual build
  platform: "node", // <— super important
  target: "node18",
  dts: true,
  bundle: true, // fine to keep, but we’ll exclude builtins
  external: ["path", "fs"], // <— keep node built-ins external
  noExternal: ["some-npm-lib-if-needed"], // optional
});
