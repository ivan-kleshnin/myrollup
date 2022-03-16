import resolvePlugin from "@rollup/plugin-node-resolve"
import {babel as babelPlugin} from "@rollup/plugin-babel"
import typescriptPlugin from "@rollup/plugin-typescript"
import {defineConfig} from "rollup"
import dtsPlugin from "rollup-plugin-dts"
import {terser as terserPlugin} from "rollup-plugin-terser"
import packageJson from "./package.json"

type Foo = {
  foo: "FOO"
}

console.log(packageJson.module.replace(".js", ".jsx"))

export default defineConfig([
  // Transpile sources to type definitions
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      }
    ],
    external: Object.keys(packageJson.peerDependencies),
    plugins: [
      resolvePlugin({
        extensions: [".ts", ".tsx"/*, ".js", ".jsx"*/]
      }),
      typescriptPlugin({tsconfig: "./tsconfig.json"}),
    ],
  },

  // Transpile sources to CJS and ESM
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        plugins: [terserPlugin()],
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        plugins: [terserPlugin()],
        sourcemap: true,
      }
    ],
    external: Object.keys(packageJson.peerDependencies),
    plugins: [
      resolvePlugin({
        extensions: [".ts", ".tsx"/*, ".js", ".jsx"*/]
      }),
      babelPlugin({
        babelHelpers: "bundled",
        extensions: [".ts", ".tsx"/*, ".js", ".jsx"*/]
      }),
    ],
  },

  // Concat type definitions into a single file
  {
    input: "dist/esm/types/src/index.d.ts",
    output: {file: "dist/index.d.ts", format: "esm"},
    plugins: [
      dtsPlugin()
    ],
  }
])

/*
https://www.npmjs.com/package/@rollup/plugin-commonjs
🍣 A Rollup plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle

https://www.npmjs.com/package/rollup-plugin-terser
🍣 A Rollup plugin to minify generated es bundle. Uses Terser under the hood.
*/

// https://github.com/rollup/plugins/issues/72
// https://github.com/wclr/yalc
