const Parser = require("../../generators/helpers/Parser");

describe("Parser", () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });

  test("parseArguments with two arguments", () => {
    const args = ["EndpointName", "domain"];
    const result = parser.parseArguments(args);

    expect(result.endpointName).toBe("EndpointName");
    expect(result.domain).toBe("domain");
    expect(result.subdirectory).toBe("");
  });

  test("parseArguments with three arguments", () => {
    const args = ["EndpointName", "domain", "subdirectory"];
    const result = parser.parseArguments(args);

    expect(result.endpointName).toBe("EndpointName");
    expect(result.domain).toBe("domain");
    expect(result.subdirectory).toBe("subdirectory");
  });

  test("parseArguments with empty arguments", () => {
    const args = [];
    const result = parser.parseArguments(args);

    expect(result.endpointName).toBeUndefined();
    expect(result.domain).toBeUndefined();
    expect(result.subdirectory).toBe("");
  });

  test("parseArguments with one argument", () => {
    const args = ["EndpointName"];
    const result = parser.parseArguments(args);

    expect(result.endpointName).toBe("EndpointName");
    expect(result.domain).toBeUndefined();
    expect(result.subdirectory).toBe("");
  });

  // Additional test cases for edge cases, e.g., more than three arguments, different input values, etc.
});
