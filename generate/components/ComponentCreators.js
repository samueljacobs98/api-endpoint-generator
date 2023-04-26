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

  controllerSpecCreator: (creatorData) => {
    const content = ControllerSpecScaffolder.generateCode(creatorData);
    return new SpecComponent("controllers", "Controller", content);
  },

  requestParserCreator: (creatorData) => {
    const content = RequestParserScaffolder.generateCode(creatorData);
    return new Component(
      "controllers/requestParsers",
      "RequestParser",
      content
    );
  },

  requestParserSpecCreator: (creatorData) => {
    const content = RequestParserSpecScaffolder.generateCode(creatorData);
    return new SpecComponent(
      "controllers/requestParsers",
      "RequestParser",
      content
    );
  },

  validatorCreator: (creatorData) => {
    const content = ValidatorScaffolder.generateCode(creatorData);
    return new Component(
      "controllers/requestParsers/validators",
      "Validator",
      content
    );
  },

  validatorSpecCreator: (creatorData) => {
    const content = ValidatorSpecScaffolder.generateCode(creatorData);
    return new SpecComponent(
      "controllers/requestParsers/validators",
      "Validator",
      content
    );
  },

  connectorCreator: (creatorData) => {
    const content = ConnectorScaffolder.generateCode(creatorData);
    return new Component("connectors", "Connector", content);
  },

  connectorSpecCreator: (creatorData) => {
    const content = ConnectorSpecScaffolder.generateCode(creatorData);
    return new SpecComponent("connectors", "Connector", content);
  },

  serviceCreator: (creatorData) => {
    const content = ServiceScaffolder.generateCode(creatorData);
    return new Component("services", "Service", content);
  },

  serviceSpecCreator: (creatorData) => {
    const content = ServiceSpecScaffolder.generateCode(creatorData);
    return new SpecComponent("services", "Service", content);
  },

  rawDataCreator: (creatorData) => {
    const content = RawDataScaffolder.generateCode(creatorData);
    const { packageName } = creatorData;
    return new Component(`models/request/${packageName}`, "RawData", content);
  },

  requestDataCreator: (creatorData) => {
    const content = RequestDataScaffolder.generateCode(creatorData);
    const { packageName } = creatorData;
    return new Component(`models/request/${packageName}`, "Request", content);
  },

  responseDataCreator: (creatorData) => {
    const content = ResponseDataScaffolder.generateCode(creatorData);
    const { packageName } = creatorData;
    return new Component(`models/response/${packageName}`, "Response", content);
  },

  mockConnectorCreator: (creatorData) => {
    const content = MockConnectorScaffolder.generateCode(creatorData);
    return new MockComponent("mocks/connectors", "Connector", content);
  },

  mockRequestParserScaffolder: (creatorData) => {
    const content = MockRequestParserScaffolder.generateCode(creatorData);
    return new MockComponent("mocks/requestParsers", "RequestParser", content);
  },

  mockServiceCreator: (creatorData) => {
    const content = MockServiceScaffolder.generateCode(creatorData);
    return new MockComponent("mocks/services", "Service", content);
  },

  mockValidatorCreator: (creatorData) => {
    const content = MockValidatorScaffolder.generateCode(creatorData);
    return new MockComponent("mocks/validators", "Validator", content);
  },
};

module.exports = {
  ...ComponentCreators,
};
