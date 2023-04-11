const { parseArguments } = require("./helpers/parser-helper");
const FileWriter = require("./helpers/FileWriter");
const UserInterface = require("./helpers/UserInterface");
const Parser = require("./helpers/Parser");

async function main() {
  // Get the arguments passed on the command line
  const args = process.argv.slice(3);

  // Check that we have a valid number of arguments
  if (args.length < 1 || args.length > 3) {
    console.log(
      "Usage: node generate_all.js <EndpointName> <Domain> [subdirectory]"
    );
    process.exit(1);
  }

  const parser = new Parser();
  const { endpointName, domain, subdirectory } = parser.parseArguments(args);

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
