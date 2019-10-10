import '../polyfill.js';
import { directive, isNodePart } from '@popeindustries/lit-html';

/**
 * Render contents of a custom element
 *
 * Note: the custom element class must expose a render() function,
 * and be a pure function of it's properties
 * (no side-effects like reading from this.getAttribute() allowed)
 *
 * <some-widget ?enabled="${data.widgetEnabled}">
 *   ${customElementRender({ enabled: data.widgetEnabled, anotherProp: 'something' })}
 * </some-widget>
 *
 * @type { (properties?: object | undefined) => (part: Part) => void }
 */
export const customElementRender = directive((properties = {}) => (part) => {
  if (!isNodePart(part)) {
    throw Error('The LitElement `render` directive can only be used in text nodes');
  }

  const { tagName } = part;
  const constructor = globalThis.customElements.get(tagName);

  if (
    constructor === undefined ||
    (constructor !== undefined && constructor.prototype.render === undefined)
  ) {
    throw Error(
      `CustomElement class for tag ${tagName} not registered with globalThis.customElements.define()`
    );
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
});
