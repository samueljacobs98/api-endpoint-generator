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

function findSubDirectory(rootPath, targetName) {
  let targetPath = null;

  function searchDirectory(currentPath) {
    if (!fs.existsSync(currentPath)) {
      return;
    }

    const items = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        if (item.name.includes(targetName)) {
          targetPath = path.join(currentPath, item.name);
          break;
        } else {
          searchDirectory(path.join(currentPath, item.name));
        }
      }
    }
  }

  searchDirectory(rootPath);
  return targetPath;
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
    let appOutputDirectory = findSubDirectory(appRootPath, targetName);
    let testOutputDirectory = findSubDirectory(testRootPath, targetName);
    console.log(`
      ${targetName},
      ${appOutputDirectory},
      ${testOutputDirectory}`);

    if (!appOutputDirectory) {
      appOutputDirectory = path.join(
        appRootPath,
        defaultOutputDirectories.shift()
      );
    }

    if (!testOutputDirectory) {
      testOutputDirectory = path.join(
        testRootPath,
        appOutputDirectory.slice(appRootPath.length)
      );
    }

    outputDirectories.push(appOutputDirectory);
    outputDirectories.push(testOutputDirectory);
  }

  const components = scriptPaths.map((scriptPath) => importModule(scriptPath));

  components.forEach((component, index) => {
    const rootPath =
      index < 5
        ? `${rootLocation}/app${extension}`
        : `${rootLocation}/test${extension}`;
    const targetIndex = index % 5;
    const targetName = targetNames[targetIndex];
    const outputDirectory = findSubDirectory(rootPath, targetName);

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
