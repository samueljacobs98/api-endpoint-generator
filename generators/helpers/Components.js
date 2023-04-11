const Component = require("./Component");
const SpecComponent = require("./SpecComponent");

const controller = new Component(
  "controllers",
  "Controller",
  "Controller Scala Content"
);

const controllerSpec = new SpecComponent(
  "controllers",
  "Controller",
  "Controller Spec Scala Content"
);

const requestParser = new Component(
  "controllers/requestParsers",
  "RequestParser",
  "RequestParser Scala Content"
);

const requestParserSpec = new SpecComponent(
  "controllers/requestParsers",
  "RequestParser",
  "RequestParser Spec Scala Content"
);

const validator = new Component(
  "controllers/requestParsers/validators",
  "Validator",
  "Validator Scala Content"
);

const validatorSpec = new SpecComponent(
  "controllers/requestParsers/validators",
  "Validator",
  "Validator Spec Scala Content"
);

const connector = new Component(
  "connectors",
  "Connector",
  "Connector Scala Content"
);

const connectorSpec = new SpecComponent(
  "connectors",
  "Connector",
  "Connector Spec Scala Content"
);

const service = new Component("services", "Service", "Service Scala Content");

const serviceSpec = new SpecComponent(
  "services",
  "Service",
  "Service Spec Scala Content"
);

module.exports = {
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
};
