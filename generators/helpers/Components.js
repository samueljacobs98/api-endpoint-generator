const Component = require("./Component");
const SpecComponent = require("./SpecComponent");

const components = {};

components.controller = new Component(
  "controllers",
  "Controller",
  "Controller Scala Content"
);

components.controllerSpec = new SpecComponent(
  "controllers",
  "Controller",
  "Controller Spec Scala Content"
);

components.requestParser = new Component(
  "controllers/requestParsers",
  "RequestParser",
  "RequestParser Scala Content"
);

components.requestParserSpec = new SpecComponent(
  "controllers/requestParsers",
  "RequestParser",
  "RequestParser Spec Scala Content"
);

components.validator = new Component(
  "controllers/requestParsers/validators",
  "Validator",
  "Validator Scala Content"
);

components.validatorSpec = new SpecComponent(
  "controllers/requestParsers/validators",
  "Validator",
  "Validator Spec Scala Content"
);

components.connector = new Component(
  "connectors",
  "Connector",
  "Connector Scala Content"
);

components.connectorSpec = new SpecComponent(
  "connectors",
  "Connector",
  "Connector Spec Scala Content"
);

components.service = new Component(
  "services",
  "Service",
  "Service Scala Content"
);

components.serviceSpec = new SpecComponent(
  "services",
  "Service",
  "Service Spec Scala Content"
);

module.exports = {
  ...components,
};
