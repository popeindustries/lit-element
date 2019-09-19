import './fixtures/some-element.js';
import './fixtures/some-error-element.js';
import { html as h, renderToString } from '@popeindustries/lit-html';
import { customElementRender } from '../src/directives/custom-element-render.js';
import { expect } from 'chai';

function compareMarkup(result, expected) {
  result = result.replace(/\s/g, '');
  expected = expected.replace(/\s/g, '');
  return result === expected;
}

describe('server rendering', () => {
  it('should not render an element with side-effectful render', async () => {
    const data = { text: 'hi' };
    const template = h`<some-error-element>${customElementRender({ data })}</some-error-element>`;
    const expected = '<some-error-element></some-error-element>';
    expect(compareMarkup(await renderToString(template), expected)).to.equal(true);
  });
  it('should render an element with render helper method', async () => {
    const data = { text: 'hi', othertext: 'bye' };
    const template = h`<some-element>${customElementRender({ data })}</some-element>`;
    const expected = '<some-element><p>hi <span>bye</span></p></some-element>';
    expect(compareMarkup(await renderToString(template), expected)).to.equal(true);
  });
});
