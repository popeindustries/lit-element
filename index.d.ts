declare module '@popeindustries/lit-element' {
  import { TemplateResult } from '@popeindustries/lit-html';
  export { html, svg } from '@popeindustries/lit-html';

  export function css(strings: TemplateStringsArray, ...values: Array<unknown>): TemplateResult;

  export class LitElement {
    static render: (result: unknown, container?: any, options?: any) => void;
    protected render(): TemplateResult | void;
  }
}
