const Component = require("./Component");
const SpecComponent = require("./SpecComponent");
const MockComponent = require("./MockComponent");
const ControllerScaffolder = require("../scaffolds/ControllerScaffolder");
const ControllerSpecScaffolder = require("../scaffolds/ControllerSpecScaffolder");
const RequestParserScaffolder = require("../scaffolds/RequestParserScaffolder");
const RequestParserSpecScaffolder = require("../scaffolds/RequestParserSpecScaffolder");
const ValidatorScaffolder = require("../scaffolds/ValidatorScaffolder");
const ValidatorSpecScaffolder = require("../scaffolds/ValidatorSpecScaffolder");
const ConnectorScaffolder = require("../scaffolds/ConnectorScaffolder");
const ConnectorSpecScaffolder = require("../scaffolds/ConnectorSpecScaffolder");
const ServiceScaffolder = require("../scaffolds/ServiceScaffolder");
const ServiceSpecScaffolder = require("../scaffolds/ServiceSpecScaffolder");
const MockConnectorScaffolder = require("../scaffolds/MockConnectorScaffolder");
const MockRequestParserScaffolder = require("../scaffolds/MockRequestParserScaffolder");
const MockServiceScaffolder = require("../scaffolds/MockServiceScaffolder");
const MockValidatorScaffolder = require("../scaffolds/MockValidatorScaffolder");
const RawDataScaffolder = require("../scaffolds/RawDataScaffolder");
const RequestDataScaffolder = require("../scaffolds/RequestDataScaffolder");
const ResponseDataScaffolder = require("../scaffolds/ResponseDataScaffolder");

const ComponentCreators = {
  controllerCreator: (endpointName) => {
    const content = ControllerScaffolder.generateCode(endpointName);
    return new Component("controllers", "Controller", content);
  },

  controllerSpecCreator: (endpointName) =>
    new SpecComponent(
      "controllers",
      "Controller",
      ControllerSpecScaffolder.generateCode(endpointName)
    ),

  requestParserCreator: (endpointName) =>
    new Component(
      "controllers/requestParsers",
      "RequestParser",
      RequestParserScaffolder.generateCode(endpointName)
    ),

  requestParserSpecCreator: (endpointName) =>
    new SpecComponent(
      "controllers/requestParsers",
      "RequestParser",
      RequestParserSpecScaffolder.generateCode(endpointName)
    ),

  validatorCreator: (endpointName) =>
    new Component(
      "controllers/requestParsers/validators",
      "Validator",
      ValidatorScaffolder.generateCode(endpointName)
    ),

  validatorSpecCreator: (endpointName) =>
    new SpecComponent(
      "controllers/requestParsers/validators",
      "Validator",
      ValidatorSpecScaffolder.generateCode(endpointName)
    ),

  connectorCreator: (endpointName) =>
    new Component(
      "connectors",
      "Connector",
      ConnectorScaffolder.generateCode(endpointName)
    ),

  connectorSpecCreator: (endpointName) =>
    new SpecComponent(
      "connectors",
      "Connector",
      ConnectorSpecScaffolder.generateCode(endpointName)
    ),

  serviceCreator: (endpointName) =>
    new Component(
      "services",
      "Service",
      ServiceScaffolder.generateCode(endpointName)
    ),

  serviceSpecCreator: (endpointName) =>
    new SpecComponent(
      "services",
      "Service",
      ServiceSpecScaffolder.generateCode(endpointName)
    ),

  rawDataCreator: (endpointName) => {
    const content = RawDataScaffolder.generateCode(endpointName);
    const packageName = endpointName.replace(/^(.)/, (_, p1) => p1.toLowerCase());
    return new Component(`models/request/${packageName}`, "RawData", content);
  },
  
  requestDataCreator: (endpointName) => {
    const content = RequestDataScaffolder.generateCode(endpointName);
    const packageName = endpointName.replace(/^(.)/, (_, p1) => p1.toLowerCase());
    return new Component(`models/request/${packageName}`, "Request", content);
  },
  
  responseDataCreator: (endpointName) => {
    const content = ResponseDataScaffolder.generateCode(endpointName);
    const packageName = endpointName.replace(/^(.)/, (_, p1) => p1.toLowerCase());
    return new Component(`models/response/${packageName}`, "Response", content);
  },

  mockConnectorCreator: (endpointName) =>
    new MockComponent(
      "mocks/connectors",
      "Connector",
      MockConnectorScaffolder.generateCode(endpointName)
    ),

  mockRequestParserScaffolder: (endpointName) =>
    new MockComponent(
      "mocks/requestParsers",
      "RequestParser",
      MockRequestParserScaffolder.generateCode(endpointName)
    ),

  mockServiceCreator: (endpointName) =>
    new MockComponent(
      "mocks/services",
      "Service",
      MockServiceScaffolder.generateCode(endpointName)
    ),

  mockValidatorCreator: (endpointName) =>
    new MockComponent(
      "mocks/validators",
      "Validator",
      MockValidatorScaffolder.generateCode(endpointName)
    ),
};

module.exports = {
  ...ComponentCreators,
};
