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

  getComponentData(rootLocation, subdirectory, endpointName) {
    return {
      rootLocation,
      subdirectory,
      endpointName,
      rootLocationExtension: this.#rootLocationExtension,
      componentRoute: this.#componentRoute,
      component: this.#component,
      content: this.#content,
      specExtension: this.#withSpecExtension ? "Spec" : "",
      mockExtension: this.#withMockExtension ? "Mock" : "",
    };
  }
}

module.exports = Component;
