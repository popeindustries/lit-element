import { directive } from '@popeindustries/lit-html';

export const render = directive(() => (part) => {
  part.setValue(undefined);
});
