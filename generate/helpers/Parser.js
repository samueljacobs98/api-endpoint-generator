class Parser {
  parseArguments(args) {
    const endpointName = args[0];
    const domain = args[1];
    const subdirectory = args.length === 3 ? `${args[2]}` : "";

    return { endpointName, domain, subdirectory };
  }
}

module.exports = Parser;
