const fs = require("fs");

function createDirectoryIfNotExists(outputDirectory) {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }
}

function checkIfFileExists(fileName) {
  if (fs.existsSync(fileName)) {
    console.error(`Error: File '${fileName}' already exists.`);
    process.exit(1);
  }
}

function writeFile(fileName, code) {
  fs.writeFileSync(fileName, code);
  console.log(`Generated ${fileName}`);
}

module.exports = {
  createDirectoryIfNotExists,
  checkIfFileExists,
  writeFile,
};
