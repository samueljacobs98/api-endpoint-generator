const Component = require("./Component");
const SpecComponent = require("./SpecComponent");
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
// ADD IN
const MockConnectorScaffolder = require("../scaffolds/MockConnectorScaffolder");
const MockRequestParserScaffolder = require("../scaffolds/MockRequestParserScaffolder");
const MockServiceScaffolder = require("../scaffolds/MockServiceScaffolder");
const MockValidatorScaffolder = require("../scaffolds/MockValidatorScaffolder");

const components = {
  controller: (endpointName) => {
    const content = ControllerScaffolder.generateCode(endpointName);
    console.log(content);
    return new Component("controllers", "Controller", content);
  },

  controllerSpec: (endpointName) =>
    new SpecComponent(
      "controllers",
      "Controller",
      ControllerSpecScaffolder.generateCode(endpointName)
    ),

  requestParser: (endpointName) =>
    new Component(
      "controllers/requestParsers",
      "RequestParser",
      RequestParserScaffolder.generateCode(endpointName)
    ),

  requestParserSpec: (endpointName) =>
    new SpecComponent(
      "controllers/requestParsers",
      "RequestParser",
      RequestParserSpecScaffolder.generateCode(endpointName)
    ),

  validator: (endpointName) =>
    new Component(
      "controllers/requestParsers/validators",
      "Validator",
      ValidatorScaffolder.generateCode(endpointName)
    ),

  validatorSpec: (endpointName) =>
    new SpecComponent(
      "controllers/requestParsers/validators",
      "Validator",
      ValidatorSpecScaffolder.generateCode(endpointName)
    ),

  connector: (endpointName) =>
    new Component(
      "connectors",
      "Connector",
      ConnectorScaffolder.generateCode(endpointName)
    ),

  connectorSpec: (endpointName) =>
    new SpecComponent(
      "connectors",
      "Connector",
      ConnectorSpecScaffolder.generateCode(endpointName)
    ),

  service: (endpointName) =>
    new Component(
      "services",
      "Service",
      ServiceScaffolder.generateCode(endpointName)
    ),

  serviceSpec: (endpointName) =>
    new SpecComponent(
      "services",
      "Service",
      ServiceSpecScaffolder.generateCode(endpointName)
    ),
};

module.exports = {
  ...components,
};
