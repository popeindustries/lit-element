import { directive, isNodePart } from '@popeindustries/lit-html';

const render = directive(renderDirective);

/**
 *
 *
 * @param { object } data
 * @returns { (part: NodePart) => void }
 */
function renderDirective(data) {
  return function(part) {
    if (!isNodePart(part)) {
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

export { render };
