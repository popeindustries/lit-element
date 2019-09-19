import { directive, isNodePart } from '@popeindustries/lit-html';

const customElementRender = directive(customElementRenderDirective);

/**
 * Render contents of LitElement component
 *
 * @param { object } properties
 * @returns { (part: NodePart) => void }
 */
function customElementRenderDirective(properties) {
  return function(part) {
    if (!isNodePart(part)) {
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

export { customElementRender };
