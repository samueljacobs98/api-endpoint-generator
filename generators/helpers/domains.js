const components = require("./components");

const domains = {
  all: [],
};

domains.all.push(components.controller);
domains.all.push(components.controllerSpec);
domains.all.push(components.requestParser);
domains.all.push(components.requestParserSpec);
domains.all.push(components.validator);
domains.all.push(components.validatorSpec);
domains.all.push(components.connector);
domains.all.push(components.connectorSpec);
domains.all.push(components.service);
domains.all.push(components.serviceSpec);

module.exports = domains;
