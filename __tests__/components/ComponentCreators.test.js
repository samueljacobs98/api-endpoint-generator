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
  rawDataCreator,
  requestDataCreator,
  responseDataCreator,
  mockConnectorCreator,
  mockRequestParserScaffolder,
  mockServiceCreator,
  mockValidatorCreator,
} = require("../../generate/components/ComponentCreators");
const Component = require("../../generate/components/Component");
const SpecComponent = require("../../generate/components/SpecComponent");
const CreatorData = require("../../generate/components/CreatorData");
const { controllerFixture } = require("../../__fixtures__/controllerFixtures");
const { controllerSpecFixture } = require("../../__fixtures__/controllerSpecFixtures");

describe("Components", () => {
  const endpointName = "EndpointName"
  const subdirectory = "v2"
  const data = new CreatorData(endpointName, subdirectory)

  class ComponentTestData {
    constructor(creator, componentRoute, componentName, content, rootLocationExtension, instanceOf) {
      this.creator = creator;
      this.componentRoute = componentRoute;
      this.componentName = componentName;
      this.content = content;
      this.rootLocationExtension = rootLocationExtension;
      this.instanceOf = instanceOf;
    }
  }

  const components = [
    new ComponentTestData(controllerCreator, "controllers", "Controller", controllerFixture, "app", Component),
    new ComponentTestData(controllerSpecCreator, "controllers", "Controller", controllerSpecFixture, "test", SpecComponent),
  ]

  components.forEach(testData => {
    const { creator, componentRoute, componentName, content, rootLocationExtension } = testData

    test(`${componentName} is a Component with expected values`, () => {
      const component = creator(data);
    
      expect(component).toBeInstanceOf(Component);
      expect(component.getComponentRoute()).toBe(componentRoute);
      expect(component.getComponent()).toBe(componentName);
      expect(component.getContent()).toBe(content);
      expect(component.getRootLocationExtension()).toBe(rootLocationExtension);
    });
  })

})
