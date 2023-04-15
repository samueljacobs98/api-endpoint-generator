const components = require("./components");

const domains = {
  all: [
    components.controller,
    components.controllerSpec,
    components.requestParser,
    components.requestParserSpec,
    components.validator,
    components.validatorSpec,
    components.connector,
    components.connectorSpec,
    components.serviceSpec,
    components.service,
    components.mockConnectorScaffolder,
    components.mockRequestParserScaffolder,
    components.mockServiceScaffolder,
    components.mockValidatorScaffolder,
  ],
  controllerAll: [components.controller, components.controllerSpec],
  requestParserAll: [components.requestParser, components.requestParserSpec],
  validatorAll: [components.validator, components.validatorSpec],
  connectorAll: [components.connector, components.connectorSpec],
  serviceAll: [components.service, components.serviceSpec],
  mocks: [
    components.mockConnectorScaffolder,
    components.mockRequestParserScaffolder,
    components.mockServiceScaffolder,
    components.mockValidatorScaffolder,
  ],
};

function validateDomain(domain) {
  if (!domains[domain]) {
    console.log("Invalid domain");
    process.exit(1);
  }
}

module.exports = { domains, validateDomain };
