const {
  controllerCreator,
  controllerSpecCreator,
  requestParserCreator,
  requestParserSpecCreator,
  validatorCreator,
  validatorSpecCreator,
  connectorCreator,
  connectorSpecCreator,
  serviceCreator,
  serviceSpecCreator,
} = require("../../generate/components/ComponentCreators");
const Component = require("../../generate/components/Component");
const SpecComponent = require("../../generate/components/SpecComponent");
const CreatorData = require("../../generate/components/CreatorData");
const { controllerFixture } = require("../../__fixtures__/controllerFixtures");
const { controllerSpecFixture } = require("../../__fixtures__/controllerSpecFixtures");
const { requestParserFixture } = require("../../__fixtures__/requestParserFixture");
const { requestParserSpecFixture } = require("../../__fixtures__/requestParserSpecFixture");

describe("Components", () => {
  test("controller is a Component with expected values", () => {
    const data = new CreatorData("EndpointName", "v2")
    const controller = controllerCreator(data);

    const content = controllerFixture

    expect(controller).toBeInstanceOf(Component);
    expect(controller.getComponentRoute()).toBe("controllers");
    expect(controller.getComponent()).toBe("Controller");
    expect(controller.getContent()).toBe(content);
    expect(controller.getRootLocationExtension()).toBe("app");
  });

  test("controllerSpec is a SpecComponent with expected values", () => {
    const data = new CreatorData("EndpointName", "v2")
    const controllerSpec = controllerSpecCreator(data);

    const content = controllerSpecFixture

    expect(controllerSpec).toBeInstanceOf(SpecComponent);
    expect(controllerSpec.getComponentRoute()).toBe("controllers");
    expect(controllerSpec.getComponent()).toBe("Controller");
    expect(controllerSpec.getContent()).toBe(content);
    expect(controllerSpec.getRootLocationExtension()).toBe("test");
  });

})
