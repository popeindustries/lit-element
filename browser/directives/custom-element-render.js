import { directive } from '@popeindustries/lit-html';

export const customElementRender = directive(() => {
  const fn = (part) => {
    part.setValue(undefined);
  };

  // Allow lit-html-server to identify this directive registered with lit-html
  fn.isDirective = true;
  return fn;
});
