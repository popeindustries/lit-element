declare module '@popeindustries/lit-element' {
  export * from 'lit-element';
}

declare module '@popeindustries/lit-element/directives/custom-element-render.js' {
  import { Part } from '@popeindustries/lit-html';

  export const customElementRender: (properties?: object | undefined) => (part: Part) => void;
}
