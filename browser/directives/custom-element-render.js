import { directive } from '@popeindustries/lit-html';

export const customElementRender = directive(() => (part) => {
  part.setValue(undefined);
});
