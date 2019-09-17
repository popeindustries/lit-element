const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'index.mjs',
      format: 'esm'
    },
    external: ['stream', '@popeindustries/lit-html'],
    plugins: [commonjs(), resolve()]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'index.js',
      format: 'cjs'
    },
    external: ['stream', '@popeindustries/lit-html'],
    plugins: [commonjs(), resolve()]
  }
];
