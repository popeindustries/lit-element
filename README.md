[![NPM Version](https://img.shields.io/npm/v/@popeindustries/lit-element.svg?style=flat)](https://npmjs.org/package/@popeindustries/lit-element)

# @popeindustries/lit-element

Seamlessly render the same **lit-element** custom element on the server and in the browser. This project is a wrapper around [**lit-element**](https://polymer.github.io/lit-element/) and [**@popeindustries/lit-html-server**](https://github.com/popeindustries/lit-html-server) to handle import aliasing.

> Until there is a standard technique for establishing environment specific import aliases, this library uses the unoffical `package.json#browser` field, currently supported by all major bundler tools.
