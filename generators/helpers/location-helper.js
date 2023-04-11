const scriptPaths = [
  "../scripts/controller-generator.js",
  "../scripts/controller-spec-generator.js",
  "../scripts/request-parser-generator.js",
  "../scripts/request-parser-spec-generator.js",
  "../scripts/validator-generator.js",
  "../scripts/validator-spec-generator.js",
  "../scripts/connector-generator.js",
  "../scripts/connector-spec-generator.js",
  "../scripts/service-generator.js",
  "../scripts/service-spec-generator.js",
];

const defaultOutputDirectories = [
  "controllers",
  "controllers/requestParsers",
  "controllers/requestParsers/validators",
  "connectors",
  "services",
];

module.exports = {
  scriptPaths,
  defaultOutputDirectories,
  targetNames,
};
