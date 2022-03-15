import jsxPlugin from "acorn-jsx"
import resolvePlugin from "@rollup/plugin-node-resolve"
import {babel as babelPlugin} from "@rollup/plugin-babel"
import typescriptPlugin from "@rollup/plugin-typescript"
import {defineConfig} from "rollup"
import dtsPlugin from "rollup-plugin-dts"

const packageJson = require("./package.json")

type Foo = {
  foo: "FOO"
}

console.log(packageJson.module.replace(".js", ".jsx"))

export default defineConfig([
  // TSX -> JSX
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main.replace(".js", ".jsx"),
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module.replace(".js", ".jsx"),
        format: "esm",
        sourcemap: true,
      }
    ],
    external: Object.keys(packageJson.peerDependencies),
    plugins: [
      // TODO use babelPlugin with typescript preset
      // .TSX -> .JSX ->(babel)-> .JS version produces invalid code
      resolvePlugin(),
      typescriptPlugin({tsconfig: "./tsconfig.json"}),
    ],
    acornInjectPlugins: [jsxPlugin() as () => unknown],
  },

  // JSX -> JS (1)
  // {
  //   input: packageJson.main.replace(".js", ".jsx"),
  //   output: {
  //     file: packageJson.main,
  //     format: "cjs",
  //     sourcemap: true,
  //   },
  //   external: Object.keys(packageJson.peerDependencies),
  //   plugins: [
  //     resolvePlugin(),
  //     babelPlugin({babelHelpers: "bundled"}),
  //   ],
  // },

  // JSX -> JS (2)
  // {
  //   input: packageJson.module.replace(".js", ".jsx"),
  //   output: {
  //     file: packageJson.module,
  //     format: "esm",
  //     sourcemap: true,
  //   },
  //   external: Object.keys(packageJson.peerDependencies),
  //   plugins: [
  //     resolvePlugin(),
  //     babelPlugin({babelHelpers: "bundled"}),
  //   ],
  // },

  // *.D.TS -> INDEX.D.TS
  {
    input: "dist/esm/types/src/index.d.ts",
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

// https://github.com/rollup/plugins/issues/72
