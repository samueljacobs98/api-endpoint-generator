const readline = require("readline");
const directory = require("./directory");
const fileHelper = require("./file-helper");

function generateCode(outputDirectory, endpointName, ext, code) {
  const fileName = `${outputDirectory}/${endpointName}${ext}.scala`;

  fileHelper.createDirectoryIfNotExists(outputDirectory);
  fileHelper.checkIfFileExists(fileName);
  fileHelper.writeFile(fileName, code);
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
    "./scripts/controller-spec-generator.js",
    "./scripts/request-parser-generator.js",
    "./scripts/request-parser-spec-generator.js",
    "./scripts/validator-generator.js",
    "./scripts/validator-spec-generator.js",
    "./scripts/connector-generator.js",
    "./scripts/connector-spec-generator.js",
    "./scripts/service-generator.js",
    "./scripts/service-spec-generator.js",
  ];

  const defaultOutputDirectories = [
    "controllers",
    "controllers/requestParsers",
    "controllers/requestParsers/validators",
    "connectors",
    "services",
  ];

  const targetNames = [
    "controllers",
    "requestParsers",
    "validators",
    "connectors",
    "services",
  ];

  const appRootPath = `${rootLocation}/app${extension}`;
  const testRootPath = `${rootLocation}/test${extension}`;

  const outputDirectories = [];

  for (const targetName of targetNames) {
    let appOutputDirectory = directory.findSubDirectory(
      appRootPath,
      targetName
    );
    let testOutputDirectory = directory.findSubDirectory(
      testRootPath,
      targetName
    );

    if (!appOutputDirectory) {
      appOutputDirectory = directory.createSubDirectory(
        appRootPath,
        defaultOutputDirectories.shift()
      );
    }

    if (!testOutputDirectory) {
      testOutputDirectory = directory.createSubDirectory(
        testRootPath,
        appOutputDirectory.slice(appRootPath.length)
      );
    }

    outputDirectories.push(appOutputDirectory);
    outputDirectories.push(testOutputDirectory);
  }

  const components = scriptPaths.map((scriptPath) =>
    directory.importModule(scriptPath)
  );

  components.forEach((component, index) => {
    const rootPath =
      index % 2 === 0
        ? `${rootLocation}/app${extension}`
        : `${rootLocation}/test${extension}`;
    const targetIndex = index % 5;
    const targetName = targetNames[targetIndex];

    const subDirectory = directory.findSubDirectory(rootPath, targetName);
    const outputDirectory = subDirectory
      ? subDirectory
      : outputDirectories[index];

    if (!outputDirectory) {
      console.error(
        `Error: Could not find the target directory for ${targetName}.`
      );
      process.exit(1);
    }

    const code = component.generateCode(endpointName);
    generateCode(outputDirectory, endpointName, component.EXT, code);
  });
}

main();
