const ComponentCreators = require("../components/ComponentCreators");

const Domains = {
  all: [
    ComponentCreators.controllerCreator,
    ComponentCreators.controllerSpecCreator,
    ComponentCreators.requestParserCreator,
    ComponentCreators.requestParserSpecCreator,
    ComponentCreators.validatorCreator,
    ComponentCreators.validatorSpecCreator,
    ComponentCreators.connectorCreator,
    ComponentCreators.connectorSpecCreator,
    ComponentCreators.serviceSpecCreator,
    ComponentCreators.serviceCreator,
    ComponentCreators.mockConnectorCreator,
    ComponentCreators.mockRequestParserScaffolder,
    ComponentCreators.mockServiceCreator,
    ComponentCreators.mockValidatorCreator,
  ],
  controllerAll: [
    ComponentCreators.controllerCreator,
    ComponentCreators.controllerSpecCreator,
  ],
  requestParserAll: [
    ComponentCreators.requestParserCreator,
    ComponentCreators.requestParserSpecCreator,
  ],
  validatorAll: [
    ComponentCreators.validatorCreator,
    ComponentCreators.validatorSpecCreator,
  ],
  connectorAll: [
    ComponentCreators.connectorCreator,
    ComponentCreators.connectorSpecCreator,
  ],
  serviceAll: [
    ComponentCreators.serviceCreator,
    ComponentCreators.serviceSpecCreator,
  ],
  mocks: [
    ComponentCreators.mockConnectorCreator,
    ComponentCreators.mockRequestParserScaffolder,
    ComponentCreators.mockServiceCreator,
    ComponentCreators.mockValidatorCreator,
  ],
};

function validateDomain(domain) {
  if (!Domains[domain]) {
    console.log("Invalid domain");
    process.exit(1);
  }
}

module.exports = { Domains, validateDomain };
