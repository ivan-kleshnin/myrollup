import typescriptPlugin from "@rollup/plugin-typescript"
import {defineConfig} from "rollup"
import dtsPlugin from "rollup-plugin-dts"

const packageJson = require("./package.json")

export default defineConfig([
  // Source Code
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        // name: "react-ts-lib" -- do we need this name for `cjs`?
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true
      }
    ],
    external: Object.keys(packageJson.peerDependencies),
    plugins: [
      typescriptPlugin({tsconfig: "./tsconfig.json"}),
    ],
  },

  // Type Declaration
  {
    input: "dist/esm/types/index.d.ts",
    output: {file: "dist/index.d.ts", format: "esm"},
    plugins: [
      dtsPlugin()
    ],
  }
])

/*
https://www.npmjs.com/package/@rollup/plugin-node-resolve
🍣 A Rollup plugin which locates modules using the Node resolution algorithm, for using third party modules in node_modules

https://www.npmjs.com/package/@rollup/plugin-commonjs
🍣 A Rollup plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle

https://www.npmjs.com/package/rollup-plugin-terser
🍣 A Rollup plugin to minify generated es bundle. Uses Terser under the hood.
*/

