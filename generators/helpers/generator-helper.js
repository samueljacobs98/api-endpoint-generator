const {
  createDirectoryIfNotExists,
  checkIfFileExists,
  writeFile,
} = require("./file-helper");

function generateCode(outputDirectory, endpointName, ext, code) {
  const fileName = `${outputDirectory}/${endpointName}${ext}.scala`;

  createDirectoryIfNotExists(outputDirectory);
  checkIfFileExists(fileName);
  writeFile(fileName, code);
}

module.exports = {
  generateCode,
};
