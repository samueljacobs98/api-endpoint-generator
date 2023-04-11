const {
  createDirectoryIfNotExists,
  checkIfFileExists,
  writeFile,
} = require("./file-helper");
const { searchDirectory } = require("./directory-helper");

function generateCode(outputDirectory, endpointName, ext, code) {
  const fileName = `${outputDirectory}/${endpointName}${ext}.scala`;

  createDirectoryIfNotExists(outputDirectory);
  checkIfFileExists(fileName);
  writeFile(fileName, code);
}

function getRootPath(rootLocation, extension, index) {
  return index % 2 === 0
    ? `${rootLocation}/app${extension}`
    : `${rootLocation}/test${extension}`;
}

function getOutputDirectory(rootPath, targetName, outputDirectories, index) {
  const subDirectory = searchDirectory(rootPath, targetName);
  return subDirectory ? subDirectory : outputDirectories[index];
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
    const rootPath = getRootPath(rootLocation, extension, index);
    const targetIndex = index % 5;
    const targetName = targetNames[targetIndex];
    const outputDirectory = getOutputDirectory(
      rootPath,
      targetName,
      outputDirectories,
      index
    );

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

module.exports = {
  generateComponentsCode,
};
