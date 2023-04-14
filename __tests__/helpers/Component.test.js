const Component = require("../../generators/helpers/Component");

describe("Component", () => {
  let component;

  beforeEach(() => {
    component = new Component(
      "componentRoute",
      "component",
      "content",
      "rootLocationExtension"
    );
  });

  test("constructor initializes properties", () => {
    expect(component.getComponentRoute()).toBe("componentRoute");
    expect(component.getComponent()).toBe("component");
    expect(component.getContent()).toBe("content");
    expect(component.getRootLocationExtension()).toBe("rootLocationExtension");
    expect(component.getWithSpecExtension()).toBe(false);
  });

  test("constructor initializes properties with default rootLocationExtension", () => {
    const componentWithDefault = new Component(
      "componentRoute",
      "component",
      "content"
    );

    expect(componentWithDefault.getRootLocationExtension()).toBe("app");
  });

  test("setWithSpecExtension updates withSpecExtension value", () => {
    component.setWithSpecExtension(true);
    expect(component.getWithSpecExtension()).toBe(true);
  });

  test("getRootLocationExtension returns rootLocationExtension value", () => {
    expect(component.getRootLocationExtension()).toBe("rootLocationExtension");
  });

  test("getComponentRoute returns componentRoute value", () => {
    expect(component.getComponentRoute()).toBe("componentRoute");
  });

  test("getComponent returns component value", () => {
    expect(component.getComponent()).toBe("component");
  });

  test("getContent returns content value", () => {
    expect(component.getContent()).toBe("content");
  });

  test("getWithSpecExtension returns withSpecExtension value", () => {
    expect(component.getWithSpecExtension()).toBe(false);
  });
});
