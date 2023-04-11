class Parser {
  parseArguments(args) {
    const endpointName = args[0];
    const subdirectory = args.length === 2 ? `${args[1]}` : "";
    return { endpointName, subdirectory };
  }
}

module.exports = Parser;
