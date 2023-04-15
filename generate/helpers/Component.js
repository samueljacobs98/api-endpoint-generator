class Component {
  #componentRoute;
  #component;
  #content;
  #rootLocationExtension;
  #withSpecExtension;
  #withMockExtension;

  constructor(
    componentRoute,
    component,
    content,
    rootLocationExtension = "app"
  ) {
    this.#componentRoute = componentRoute;
    this.#component = component;
    this.#content = content;
    this.#rootLocationExtension = rootLocationExtension;
    this.#withSpecExtension = false;
    this.#withMockExtension = false;
  }

  setWithSpecExtension(value) {
    this.#withSpecExtension = value;
  }

  setWithMockExtension(value) {
    this.#withMockExtension = value;
  }

  getRootLocationExtension() {
    return this.#rootLocationExtension;
  }

  getComponentRoute() {
    return this.#componentRoute;
  }

  getComponent() {
    return this.#component;
  }

  getContent() {
    return this.#content;
  }

  getWithSpecExtension() {
    return this.#withSpecExtension;
  }

  getWithMockExtension() {
    return this.#withMockExtension;
  }
}

module.exports = Component;
