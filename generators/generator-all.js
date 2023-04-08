const { generateCode } = require("./helpers/generator-helper");
const {
  importModule,
  findSubDirectory,
  createSubDirectory,
} = require("./helpers/directory-helper");
const {
  scriptPaths,
  defaultOutputDirectories,
  targetNames,
  getRootLocation,
} = require("./helpers/location-helper");

function parseArguments() {
  const args = process.argv.slice(2);

  if (args.length < 1 || args.length > 2) {
    console.log("Usage: node generate_all.js <EndpointName> [extension]");
    process.exit(1);
  }

  const endpointName = args[0];
  const extension = args.length === 2 ? `/${args[1]}` : "";
  return { endpointName, extension };
}

function createOutputDirectories(targetNames, appRootPath, testRootPath) {
  const outputDirectories = [];

  for (const targetName of targetNames) {
    let appOutputDirectory = findSubDirectory(appRootPath, targetName);
    let testOutputDirectory = findSubDirectory(testRootPath, targetName);

    if (!appOutputDirectory) {
      appOutputDirectory = createSubDirectory(
        appRootPath,
        defaultOutputDirectories.shift()
      );
    }

    if (!testOutputDirectory) {
      testOutputDirectory = createSubDirectory(
        testRootPath,
        appOutputDirectory.slice(appRootPath.length)
      );
    }

    outputDirectories.push(appOutputDirectory);
    outputDirectories.push(testOutputDirectory);
  }

  return outputDirectories;
}

function generateComponentsCode(
  components,
  targetNames,
  rootLocation,
  extension,
  outputDirectories,
  endpointName
) {
  components.forEach((component, index) => {
    const rootPath =
      index % 2 === 0
        ? `${rootLocation}/app${extension}`
        : `${rootLocation}/test${extension}`;
    const targetIndex = index % 5;
    const targetName = targetNames[targetIndex];

    const subDirectory = findSubDirectory(rootPath, targetName);
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

async function main() {
  const { endpointName, extension } = parseArguments();
  const rootLocation = await getRootLocation();

  const appRootPath = `${rootLocation}/app${extension}`;
  const testRootPath = `${rootLocation}/test${extension}`;

  const outputDirectories = createOutputDirectories(
    targetNames,
    appRootPath,
    testRootPath
  );

  const components = scriptPaths.map((scriptPath) => importModule(scriptPath));

  generateComponentsCode(
    components,
    targetNames,
    rootLocation,
    extension,
    outputDirectories,
    endpointName
  );
}

main();
