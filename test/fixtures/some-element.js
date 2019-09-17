import { html, LitElement } from '../../index.mjs';

export class SomeElement extends LitElement {
  static get properties() {
    return {
      data: {
        reflect: false,
        type: Object
      }
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <p>${this.data.text}</p>
    `;
  }
}

if (!globalThis.customElements.get('some-element')) {
  globalThis.customElements.define('some-element', SomeElement);
}
