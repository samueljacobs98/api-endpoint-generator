const {
  createDirectoryIfNotExists,
  checkIfFileExists,
  writeFile,
} = require("./file-helper");
const { findSubDirectory } = require("./directory-helper");

function generateCode(outputDirectory, endpointName, ext, code) {
  const fileName = `${outputDirectory}/${endpointName}${ext}.scala`;

  createDirectoryIfNotExists(outputDirectory);
  checkIfFileExists(fileName);
  writeFile(fileName, code);
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

module.exports = {
  generateComponentsCode,
};