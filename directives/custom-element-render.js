'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var litHtml = require('@popeindustries/lit-html');

const customElementRender = litHtml.directive(customElementRenderDirective);

/**
 * Render contents of LitElement component
 *
 * @param { object } properties
 * @returns { (part: NodePart) => void }
 */
function customElementRenderDirective(properties) {
  return function(part) {
    if (!litHtml.isNodePart(part)) {
      throw Error('The LitElement `render` directive can only be used in text nodes');
    }

    const { tagName } = part;
    const constructor = globalThis.customElements.get(tagName);
    console.log(tagName, constructor);
    if (
      constructor === undefined ||
      (constructor !== undefined && constructor.prototype.render === undefined)
    ) {
      return part.setValue(undefined);
    }

    try {
      // Create instance without triggering potential side-effects in constructor
      const instance = Object.create(constructor.prototype);

      for (const key in properties) {
        instance[key] = properties[key];
      }

      const result = instance.render();

      part.setValue(result);
    } catch (err) {
      console.log(err);
      part.setValue(undefined);
    }
  };
}

exports.customElementRender = customElementRender;
