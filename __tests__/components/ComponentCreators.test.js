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
const { requestParserFixture } = require("../../__fixtures__/requestParserFixtures");
const { requestParserSpecFixture } = require("../../__fixtures__/requestParserSpecFixtures");
const { validatorFixture } = require("../../__fixtures__/validatorFixtures");
const { validatorSpecFixture } = require("../../__fixtures__/validatorSpecFixtures");
const { connectorFixture } = require("../../__fixtures__/connectorFixtures");
const { connectorSpecFixture } = require("../../__fixtures__/connectorSpecFixtures");
const { serviceFixture } = require("../../__fixtures__/serviceFixtures");
const { serviceSpecFixture } = require("../../__fixtures__/serviceSpecFixtures");
const { rawDataFixture } = require("../../__fixtures__/rawDataFixtures");
const { requestDataFixture } = require("../../__fixtures__/requestDataFixtures");
const { responseDataFixture } = require("../../__fixtures__/responseDataFixtures");
const { mockConnectorFixture } = require("../../__fixtures__/mockConnectorFixtures");
const { mockRequestParserFixture } = require("../../__fixtures__/mockRequestParserFixtures");
const { mockServiceFixture } = require("../../__fixtures__/mockServiceFixtures");
const { mockValidatorFixture } = require("../../__fixtures__/mockValidatorFixtures");
const MockComponent = require("../../generate/components/MockComponent");

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
    new ComponentTestData(requestParserCreator, "controllers/requestParsers", "RequestParser", requestParserFixture, "app", Component),
    new ComponentTestData(requestParserSpecCreator, "controllers/requestParsers", "RequestParser", requestParserSpecFixture, "test", SpecComponent),
    new ComponentTestData(validatorCreator, "controllers/requestParsers/validators", "Validator", validatorFixture, "app", Component),
    new ComponentTestData(validatorSpecCreator, "controllers/requestParsers/validators", "Validator", validatorSpecFixture, "test", SpecComponent),
    new ComponentTestData(connectorCreator, "connectors", "Connector", connectorFixture, "app", Component),
    new ComponentTestData(connectorSpecCreator, "connectors", "Connector", connectorSpecFixture, "test", SpecComponent),
    new ComponentTestData(serviceCreator, "services", "Service", serviceFixture, "app", Component),
    new ComponentTestData(serviceSpecCreator, "services", "Service", serviceSpecFixture, "test", SpecComponent),
    new ComponentTestData(rawDataCreator, "models/request/endpointName", "RawData", rawDataFixture, "app", Component),
    new ComponentTestData(requestDataCreator, "models/request/endpointName", "Request", requestDataFixture, "app", Component),
    new ComponentTestData(responseDataCreator, "models/response/endpointName", "Response", responseDataFixture, "app", Component),
    new ComponentTestData(mockConnectorCreator, "mocks/connectors", "Connector", mockConnectorFixture, "test", MockComponent),
    new ComponentTestData(mockRequestParserScaffolder, "mocks/requestParsers", "RequestParser", mockRequestParserFixture, "test", MockComponent),
    new ComponentTestData(mockServiceCreator, "mocks/services", "Service", mockServiceFixture, "test", MockComponent),
    new ComponentTestData(mockValidatorCreator, "mocks/validators", "Validator", mockValidatorFixture, "test", MockComponent),
  ]

  components.forEach(testData => {
    const { creator, componentRoute, componentName, content, rootLocationExtension, instanceOf } = testData

    test(`${componentName} is a ${instanceOf} with expected values`, () => {
      const component = creator(data);
    
      expect(component).toBeInstanceOf(instanceOf);
      expect(component.getComponentRoute()).toBe(componentRoute);
      expect(component.getComponent()).toBe(componentName);
      expect(component.getContent()).toBe(content);
      expect(component.getRootLocationExtension()).toBe(rootLocationExtension);
    });
  })

})
