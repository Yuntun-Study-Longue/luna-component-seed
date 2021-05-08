import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";

const packageJson = require("./package.json");

export default {
  input: "src/components/index.js",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react'],
        babelHelpers: 'runtime'
    }),
    commonjs(),
    postcss(),
    copy({
      targets: [
        {
          src: "src/components/variables.scss",
          dest: "lib",
          rename: "variables.scss"
        },
        {
          src: "src/components/typography.scss",
          dest: "lib",
          rename: "typography.scss"
        }
      ]
    })
  ]
};