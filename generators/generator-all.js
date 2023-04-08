const fs = require("fs");
const path = require("path");
const readline = require("readline");

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

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1 || args.length > 2) {
    console.log("Usage: node generate_all.js <EndpointName> [extension]");
    process.exit(1);
  }

  const endpointName = args[0];
  const extension = args.length === 2 ? `/${args[1]}` : "";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const rootLocation = await new Promise((resolve) =>
    rl.question("Enter the root location of the repository: ", (answer) => {
      rl.close();
      resolve(answer);
    })
  );

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
    `${rootLocation}/app${extension}/controllers`,
    `${rootLocation}/app${extension}/controllers/requestParsers`,
    `${rootLocation}/app${extension}/controllers/requestParsers/validators`,
    `${rootLocation}/app${extension}/connectors`,
    `${rootLocation}/app${extension}/services`,
    `${rootLocation}/test${extension}/controllers`,
    `${rootLocation}/test${extension}/controllers/requestParsers`,
    `${rootLocation}/test${extension}/controllers/requestParsers/validators`,
    `${rootLocation}/test${extension}/connectors`,
    `${rootLocation}/test${extension}/services`,
  ];

  const components = scriptPaths.map((scriptPath) => importModule(scriptPath));

  components.forEach((component, index) => {
    const outputDirectory = outputDirectories[index];
    const code = component.generateCode(endpointName);
    generateCode(outputDirectory, endpointName, component.EXT, code);
  });
}

main();
