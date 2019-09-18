import { directive, isNodePart } from '@popeindustries/lit-html';

export const render = directive(renderDirective);

/**
 * Render contents of LitElement component
 *
 * @param { object } properties
 * @returns { (part: NodePart) => void }
 */
function renderDirective(properties) {
  return function(part) {
    if (!isNodePart(part)) {
      throw Error('The LitElement `render` directive can only be used in text nodes');
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
      const instance = Object.create(constructor.prototype);

      for (const key of properties) {
        instance[key] = properties[key];
      }

      const result = instance.render();

      part.setValue(result);
    } catch (err) {
      console.log(err);
    }
  };
}
