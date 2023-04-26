const FileWriter = require("./helpers/FileWriter");
const UserInterface = require("./helpers/UserInterface");
const Parser = require("./helpers/Parser");
const { Domains, validateDomain } = require("./helpers/Domains");
const CreatorData = require("./components/CreatorData");

async function generate(args) {
  const parser = new Parser();
  const { endpointName, domain, subdirectory } = parser.parseArguments(args);

  validateDomain(domain);
  const componentCreators = [...Domains[domain]];

  const rootLocation = await UserInterface.getRootFromUser();

  const creatorData = new CreatorData(endpointName, subdirectory);

  componentCreators.forEach((createComponent) => {
    const componentData = createComponent(creatorData).getComponentData(
      rootLocation,
      subdirectory,
      endpointName
    );

    new FileWriter(componentData).writeFile();
  });
}

module.exports = generate;
