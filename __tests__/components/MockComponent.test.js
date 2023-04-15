const Component = require("../../generate/components/Component");
const MockComponent = require("../../generate/components/MockComponent");

describe("MockComponent", () => {
  let mockComponent;

  beforeEach(() => {
    mockComponent = new MockComponent(
      "componentRoute",
      "component",
      "content",
      "test"
    );
  });

  test("MockComponent is an instance of Component", () => {
    expect(mockComponent).toBeInstanceOf(Component);
  });

  test("MockComponent properties are set correctly", () => {
    expect(mockComponent.getComponentRoute()).toBe("componentRoute");
    expect(mockComponent.getComponent()).toBe("component");
    expect(mockComponent.getContent()).toBe("content");
    expect(mockComponent.getRootLocationExtension()).toBe("test");
    expect(mockComponent.getWithSpecExtension()).toBe(false);
    expect(mockComponent.getWithMockExtension()).toBe(true);
  });

  test("MockComponent with default rootLocationExtension", () => {
    const defaultMockComponent = new MockComponent(
      "componentRoute",
      "component",
      "content"
    );
    expect(defaultMockComponent.getRootLocationExtension()).toBe("test");
  });

  // Additional test cases for edge cases, e.g., different input values, etc.
});
