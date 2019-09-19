const RE_VALID_NAME = /^[a-z][a-z0-9._-]*-[a-z0-9._-]*$/;

if (typeof globalThis === 'undefined') {
  global.globalThis = global;
}
if (typeof globalThis.customElements === 'undefined') {
  const registry = new Map();

  globalThis.customElements = {
    /**
     * Retrieve the constructor by "name"
     *
     * @param { string } name
     * @returns { Function|undefined }
     */
    get(name) {
      return registry.get(name);
    },

    /**
     * Register an element's "constructor" by tag "name"
     *
     * @param { string } name
     * @param { Function } constructor
     * @param { object } options
     */
    define(name, constructor /* , options */) {
      if (!RE_VALID_NAME.test(name)) {
        throw Error(`invalid custom element name: ${name}`);
      } else if (registry.has(name)) {
        throw Error(`a constructor has already been registered with that name: ${name}`);
      } else if (Array.from(registry.values()).includes(constructor)) {
        throw Error(`the constructor has already been registered under another name`);
      }

      registry.set(name, constructor);
    }
  };
}
