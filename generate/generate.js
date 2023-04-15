const FileWriter = require("./helpers/FileWriter");
const UserInterface = require("./helpers/UserInterface");
const Parser = require("./helpers/Parser");
const { Domains, validateDomain } = require("./helpers/Domains");

async function generate(args) {
  const parser = new Parser();
  const { endpointName, domain, subdirectory } = parser.parseArguments(args);

  validateDomain(domain);

  const userInterface = new UserInterface();
  const rootLocation = await userInterface.getRootFromUser();

  const componentCreators = [...Domains[domain]];

  componentCreators.forEach((createComponent) => {
    const component = createComponent(endpointName);

    const rootLocationExtension = component.getRootLocationExtension();
    const componentRoute = component.getComponentRoute();
    const componentType = component.getComponent();
    const specExtension = component.getWithSpecExtension() ? "Spec" : "";
    const mockExtension = component.getWithMockExtension() ? "Mock" : "";
    const content = component.getContent();

    const fileWriter = new FileWriter()
      .withRootLocation(rootLocation)
      .withRootLocationExtension(rootLocationExtension)
      .withSubdirectory(subdirectory)
      .withComponentRoute(componentRoute)
      .withEndpointName(endpointName)
      .withComponent(componentType)
      .withSpecExtension(specExtension)
      .withMockExtension(mockExtension)
      .withContent(content);

    fileWriter.writeFile();
  });
}

module.exports = generate;
