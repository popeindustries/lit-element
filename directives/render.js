'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var litHtml = require('@popeindustries/lit-html');

const render = litHtml.directive(renderDirective);

/**
 *
 *
 * @param { object } data
 * @returns { (part: NodePart) => void }
 */
function renderDirective(data) {
  return function(part) {
    if (!litHtml.isNodePart(part)) {
      throw Error('The `lit-element-render` directive can only be used in text nodes');
    }

    const { tagName } = part;
    const constructor = globalThis.customElements.get(tagName);

    if (
      constructor === undefined ||
      (constructor !== undefined && constructor.prototype.render === undefined)
    ) {
      return part.setValue(undefined);
    }

    try {
      const result = constructor.prototype.render.apply(data);

      part.setValue(result);
    } catch (err) {
      console.log(err);
    }
  };
}

exports.render = render;
