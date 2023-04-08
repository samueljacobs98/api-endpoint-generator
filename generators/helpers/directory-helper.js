const fs = require("fs");
const path = require("path");

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

module.exports = {
  importModule,
  findSubDirectory,
  createSubDirectory,
};
