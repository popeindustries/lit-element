import { html, LitElement } from '../../index.mjs';

export class SomeErrorElement extends LitElement {
  static get properties() {
    return {
      data: {
        reflect: false,
        type: Object
      }
    };
  }

  render() {
    const name = this.getAttribute('name');

    return html`
      <p>
        ${this.data.text}}
        <span>${name}</span>
      </p>
    `;
  }
}

if (!globalThis.customElements.get('some-error-element')) {
  globalThis.customElements.define('some-error-element', SomeErrorElement);
}
