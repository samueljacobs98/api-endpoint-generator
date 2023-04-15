class Component {
  #componentRoute;
  #component;
  #content;
  #rootLocationExtension;
  #withSpecExtension;

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
  }

  setWithSpecExtension(value) {
    this.#withSpecExtension = value;
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
}

module.exports = Component;
