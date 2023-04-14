const SpecComponent = require("../../generators/helpers/SpecComponent");
const Component = require("../../generators/helpers/Component");

describe("SpecComponent", () => {
  let specComponent;

  beforeEach(() => {
    specComponent = new SpecComponent(
      "componentRoute",
      "component",
      "content",
      "test"
    );
  });

  test("SpecComponent is an instance of Component", () => {
    expect(specComponent).toBeInstanceOf(Component);
  });

  test("SpecComponent properties are set correctly", () => {
    expect(specComponent.getComponentRoute()).toBe("componentRoute");
    expect(specComponent.getComponent()).toBe("component");
    expect(specComponent.getContent()).toBe("content");
    expect(specComponent.getRootLocationExtension()).toBe("test");
    expect(specComponent.getWithSpecExtension()).toBe(true);
  });

  test("SpecComponent with default rootLocationExtension", () => {
    const defaultSpecComponent = new SpecComponent(
      "componentRoute",
      "component",
      "content"
    );
    expect(defaultSpecComponent.getRootLocationExtension()).toBe("test");
  });

  // Additional test cases for edge cases, e.g., different input values, etc.
});
