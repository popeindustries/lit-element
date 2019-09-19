const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

const external = ['stream', '@popeindustries/lit-html'];
const plugins = [commonjs(), resolve()];

module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'index.mjs',
      format: 'esm'
    },
    external,
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      file: 'index.js',
      format: 'cjs'
    },
    external,
    plugins
  },
  {
    input: 'src/directives/custom-element-render.js',
    output: {
      file: 'directives/custom-element-render.mjs',
      format: 'esm'
    },
    external,
    plugins
  },
  {
    input: 'src/directives/custom-element-render.js',
    output: {
      file: 'directives/custom-element-render.js',
      format: 'cjs'
    },
    external,
    plugins
  }
];
