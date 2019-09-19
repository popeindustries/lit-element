[![NPM Version](https://img.shields.io/npm/v/@popeindustries/lit-element.svg?style=flat)](https://npmjs.org/package/@popeindustries/lit-element)
[![Build Status](https://img.shields.io/travis/popeindustries/lit-element.svg?style=flat)](https://travis-ci.org/popeindustries/lit-element)

# @popeindustries/lit-element

Seamlessly render the content's of a **lit-element** custom element on the server and in the browser. This project is a wrapper around [**lit-element**](https://polymer.github.io/lit-element/), and enables server-side rendering via [**@popeindustries/lit-html-server**](https://github.com/popeindustries/lit-html-server).

> Until there is a standard technique for establishing environment specific import aliases, this library uses the unoffical `package.json#browser` field, currently supported by all major bundler tools.

## Usage

Install with `npm/yarn`:

```bash
$ npm install --save @popeindustries/lit-element @popeindustries/lit-html-server lit-html lit-element
```

> `@popeindustries/lit-html-server`, `lit-html`, and `lit-element` are peer dependencies and must be installed separately

...write your **lit-element** component:

```js
import { html, LitElement } from '@popeindustries/lit-element';

export class SomeElement extends LitElement {
  static get properties() {
    return {
      stuff: {
        reflect: true,
        type: String
      }
    };
  }

  // Not executed on server: side-effects allowed
  constructor() {
    super();
    this.someSideEffectData = getSideEffectData();
    this.addEventListener('someEvent', () => {});
  }

  // Exectued on server
  render() {
    return html`
      <h1>${this.someSideEffectData.title}</h1>
      <p>${this.stuff} ${this.renderHelper()}</p>
    `;
  }

  // Executed on server
  renderHelper() {
    return html`
      <span>some helper</span>
    `;
  }
}

if (!globalThis.customElements.get('some-element')) {
  globalThis.customElements.define('some-element', SomeElement);
}
```

...import the component file and `customElementRender` directive on the server:

```js
import './some-element.js';
import { html, renderToStream } from '@popeindustries/lit-html';
import { customElementRender } from '@popeindustries/lit-element/directives/custom-element-render.js';
import http from 'http';

http.createServer((request, response) => {
  const properties = {
    stuff: 'some stuff',
    someSideEffectData: {
      title: 'some side-effect title'
    }
  };

  response.writeHead(200);
  renderToStream(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <some-element stuff="${properties.stuff}">
          ${customElementRender({ properties })}
        </some-element>
      </body>
    </html>
  `).pipe(response);
});
```

...and import the component file on the client:

```js
import './some-element.js';
```

## How it works

This library provides a simple and performant method for rendering the contents of **lit-element** custom elements (or any custom elements with a `render()` method) on the server. It does _not_ require DOM or `HTMLElement` polyfills, and only requires a (supplied) polyfill for `globalThis.customElements`.

1. Components are loaded and registered in a global `customElements` registry
2. When the `customElementRender` directive is invoked, the surrounding element tag name is used to retrieve the registered class constructor
3. An instance of the component is created without calling the `constructor` function (to avoid side-effects)
4. The passed `properties` are copied to the instance
5. The `instance.render()` method is called and the results are inserted into the render tree

## Caveats

- **A component's `render()` method should be a pure function of it's properties.** Calls to `this.getAttribute()`, for example, will cause rendering to fail, and no contents to be rendered.
- Components should register with `globalThis.customElements`, not `window.customElements`
