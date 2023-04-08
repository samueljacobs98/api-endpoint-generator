const fs = require("fs");
const path = require("path");
const { defaultOutputDirectories } = require("./location-helper");

function importModule(scriptPath) {
  return require(scriptPath);
}

function searchDirectory(currentPath, targetName) {
  if (!fs.existsSync(currentPath)) {
    return null;
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

function findSubDirectory(rootPath, targetName) {
  let targetPath = null;

  searchDirectory(rootPath, targetName);
  return targetPath;
}

function createSubDirectory(rootPath, targetName) {
  const targetPath = path.join(rootPath, targetName);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
    console.log(`Created directory: ${targetPath}`);
  }

  return targetPath;
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

module.exports = {
  importModule,
  findSubDirectory,
  createOutputDirectories,
};
