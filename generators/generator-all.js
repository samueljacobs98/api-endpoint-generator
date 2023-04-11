const { parseArguments } = require("./helpers/parser-helper");
const FileWriter = require("./helpers/FileWriter");
const UserInterface = require("./helpers/UserInterface");
const Parser = require("./helpers/Parser");

async function main() {
  // Get the arguments passed on the command line
  const args = process.argv.slice(2);

  // Check that we have a valid number of arguments
  if (args.length < 1 || args.length > 2) {
    console.log("Usage: node generate_all.js <EndpointName> [subdirectory]");
    process.exit(1);
  }

  const parser = new Parser();
  const { endpointName, subdirectory } = parser.parseArguments(args);

  const userInterface = new UserInterface();
  const rootLocation = await userInterface.getRootFromUser();

  const fileWriter = new FileWriter()
    .withRootLocation(rootLocation)
    .withRootLocationExtension("app")
    .withSubdirectory(subdirectory)
    .withComponentRoute("controllers/requestParsers")
    .withEndpointName(endpointName)
    .withComponent("RequestParser")
    .withSpecExtension("Spec")
    .withContent("Hello World");

  fileWriter.writeFile();
}

main();
