const { generateComponentsCode } = require("./generator-helper");
const { importModule, createOutputDirectories } = require("./directory-helper");
const {
  scriptPaths,
  targetNames,
  getRootLocation,
} = require("./location-helper");
const { parseArguments } = require("./parser-helper");

module.exports = {
  generateComponentsCode,
  importModule,
  createOutputDirectories,
  scriptPaths,
  targetNames,
  getRootLocation,
  parseArguments,
};
