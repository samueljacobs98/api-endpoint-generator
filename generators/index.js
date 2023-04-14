const { generate } = require("./generate");

const args = process.argv.slice(2, 5);

if (args.length < 1 || args.length > 3) {
  console.log(
    "Usage: node generate_all.js <EndpointName> <Domain> [subdirectory]"
  );
  process.exit(1);
}

generate(args);
