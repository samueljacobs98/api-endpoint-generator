const {
  generateComponentsCode,
  importModule,
  createOutputDirectories,
  scriptPaths,
  targetNames,
  getRootLocation,
  parseArguments,
} = require("./helpers/helper");

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
