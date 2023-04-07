const fs = require("fs");
const path = require("path");

function generateCode(outputDirectory, endpointName, ext, code) {
  const fileName = `${outputDirectory}/${endpointName}${ext}.scala`;

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  if (fs.existsSync(fileName)) {
    console.error(`Error: File '${fileName}' already exists.`);
    process.exit(1);
  }

  fs.writeFileSync(fileName, code);
  console.log(`Generated ${fileName}`);
}

function importModule(scriptPath) {
  return require(scriptPath);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 1 || args.length > 2) {
    console.log("Usage: node generate_all.js <EndpointName> [extension]");
    process.exit(1);
  }

  const endpointName = args[0];
  const extension = args.length === 2 ? `/${args[1]}` : "";

  const scriptPaths = [
    "./scripts/controller-generator.js",
    "./scripts/request-parser-generator.js",
    "./scripts/validator-generator.js",
    "./scripts/connector-generator.js",
    "./scripts/service-generator.js",
    "./scripts/controller-spec-generator.js",
    "./scripts/request-parser-spec-generator.js",
    "./scripts/validator-spec-generator.js",
    "./scripts/connector-spec-generator.js",
    "./scripts/service-spec-generator.js",
  ];

  const outputDirectories = [
    `../app${extension}/controllers`,
    `../app${extension}/controllers/requestParsers`,
    `../app${extension}/controllers/requestParsers/validators`,
    `../app${extension}/connectors`,
    `../app${extension}/services`,
    `../test${extension}/controllers`,
    `../test${extension}/controllers/requestParsers`,
    `../test${extension}/controllers/requestParsers/validators`,
    `../test${extension}/connectors`,
    `../test${extension}/services`,
  ];

  const components = scriptPaths.map((scriptPath) => importModule(scriptPath));

  components.forEach((component, index) => {
    const outputDirectory = outputDirectories[index];
    const code = component.generateCode(endpointName);
    generateCode(outputDirectory, endpointName, component.EXT, code);
  });
}

main();
