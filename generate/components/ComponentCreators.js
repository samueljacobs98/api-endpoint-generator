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
  controllerCreator: (creatorData) => {
    const content = ControllerScaffolder.generateCode(creatorData);
    return new Component("controllers", "Controller", content);
  },

  controllerSpecCreator: (creatorData) =>
    new SpecComponent(
      "controllers",
      "Controller",
      ControllerSpecScaffolder.generateCode(creatorData)
    ),

  requestParserCreator: (creatorData) =>
    new Component(
      "controllers/requestParsers",
      "RequestParser",
      RequestParserScaffolder.generateCode(creatorData)
    ),

  requestParserSpecCreator: (creatorData) =>
    new SpecComponent(
      "controllers/requestParsers",
      "RequestParser",
      RequestParserSpecScaffolder.generateCode(creatorData)
    ),

  validatorCreator: (creatorData) =>
    new Component(
      "controllers/requestParsers/validators",
      "Validator",
      ValidatorScaffolder.generateCode(creatorData)
    ),

  validatorSpecCreator: (creatorData) =>
    new SpecComponent(
      "controllers/requestParsers/validators",
      "Validator",
      ValidatorSpecScaffolder.generateCode(creatorData)
    ),

  connectorCreator: (creatorData) =>
    new Component(
      "connectors",
      "Connector",
      ConnectorScaffolder.generateCode(creatorData)
    ),

  connectorSpecCreator: (creatorData) =>
    new SpecComponent(
      "connectors",
      "Connector",
      ConnectorSpecScaffolder.generateCode(creatorData)
    ),

  serviceCreator: (creatorData) =>
    new Component(
      "services",
      "Service",
      ServiceScaffolder.generateCode(creatorData)
    ),

  serviceSpecCreator: (creatorData) =>
    new SpecComponent(
      "services",
      "Service",
      ServiceSpecScaffolder.generateCode(creatorData)
    ),

  rawDataCreator: (creatorData) => {
    const content = RawDataScaffolder.generateCode(creatorData);
    const { packageName } = creatorData
    return new Component(`models/request/${packageName}`, "RawData", content);
  },
  
  requestDataCreator: (creatorData) => {
    const content = RequestDataScaffolder.generateCode(creatorData);
    const { packageName } = creatorData
    return new Component(`models/request/${packageName}`, "Request", content);
  },
  
  responseDataCreator: (creatorData) => {
    const content = ResponseDataScaffolder.generateCode(creatorData);
    const { packageName } = creatorData
    return new Component(`models/response/${packageName}`, "Response", content);
  },

  mockConnectorCreator: (creatorData) =>
    new MockComponent(
      "mocks/connectors",
      "Connector",
      MockConnectorScaffolder.generateCode(creatorData)
    ),

  mockRequestParserScaffolder: (creatorData) =>
    new MockComponent(
      "mocks/requestParsers",
      "RequestParser",
      MockRequestParserScaffolder.generateCode(creatorData)
    ),

  mockServiceCreator: (creatorData) =>
    new MockComponent(
      "mocks/services",
      "Service",
      MockServiceScaffolder.generateCode(creatorData)
    ),

  mockValidatorCreator: (creatorData) =>
    new MockComponent(
      "mocks/validators",
      "Validator",
      MockValidatorScaffolder.generateCode(creatorData)
    ),
};

module.exports = {
  ...ComponentCreators,
};
