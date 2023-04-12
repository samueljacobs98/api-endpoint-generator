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
  ],
  controllerAll: [components.controller, components.controllerSpec],
  requestParserAll: [components.requestParser, components.requestParserSpec],
  validatorAll: [components.validator, components.validatorSpec],
  connectorAll: [components.connector, components.connectorSpec],
  serviceAll: [components.service, components.serviceSpec],
};

function validateDomain(domain) {
  if (!domains[domain]) {
    console.log("Invalid domain");
    process.exit(1);
  }
}

module.exports = { domains, validateDomain };
