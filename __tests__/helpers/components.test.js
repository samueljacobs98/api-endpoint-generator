const {
  controller,
  controllerSpec,
  requestParser,
  requestParserSpec,
  validator,
  validatorSpec,
  connector,
  connectorSpec,
  service,
  serviceSpec,
} = require("../../generate/helpers/components");

const Component = require("../../generate/helpers/Component");
const SpecComponent = require("../../generate/helpers/SpecComponent");

describe("Components", () => {
  test("controller is a Component with expected values", () => {
    expect(controller).toBeInstanceOf(Component);
    expect(controller.getComponentRoute()).toBe("controllers");
    expect(controller.getComponent()).toBe("Controller");
    expect(controller.getContent()).toBe("Controller Scala Content");
    expect(controller.getRootLocationExtension()).toBe("app");
  });

  test("controllerSpec is a SpecComponent with expected values", () => {
    expect(controllerSpec).toBeInstanceOf(SpecComponent);
    expect(controllerSpec.getComponentRoute()).toBe("controllers");
    expect(controllerSpec.getComponent()).toBe("Controller");
    expect(controllerSpec.getContent()).toBe("Controller Spec Scala Content");
    expect(controllerSpec.getRootLocationExtension()).toBe("test");
  });

  // Similar tests for requestParser, requestParserSpec, validator, validatorSpec, connector, connectorSpec, service, and serviceSpec
});
