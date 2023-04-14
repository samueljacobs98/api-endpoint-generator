const fs = require("fs");
const FileWriter = require("../../generators/helpers/FileWriter");

jest.mock("fs");

describe("FileWriter", () => {
  let fileWriter;

  beforeEach(() => {
    fileWriter = new FileWriter()
      .withContent("file content")
      .withRootLocation("/root")
      .withRootLocationExtension("app")
      .withSubdirectory("controllers")
      .withComponentRoute("test")
      .withEndpointName("Endpoint")
      .withComponent("Component")
      .withSpecExtension("Spec");
    console.log = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("withContent, withRootLocation, withRootLocationExtension, withSubdirectory, withComponentRoute, withEndpointName, withComponent, and withSpecExtension work correctly", () => {
    const testWriter = new FileWriter();
    testWriter
      .withContent("test content")
      .withRootLocation("test root")
      .withRootLocationExtension("test app")
      .withSubdirectory("test sub")
      .withComponentRoute("test route")
      .withEndpointName("test endpoint")
      .withComponent("test component")
      .withSpecExtension("test spec");

    // Test internal methods or write additional logic to access the private fields for testing purposes
  });

  test("writeFile creates directory and writes file", () => {
    const expectedDirectory = "/root/app/controllers/test";
    const expectedFileName = "/EndpointComponentSpec.scala";
    const expectedPath = expectedDirectory + expectedFileName;

    fileWriter.writeFile();

    expect(fs.existsSync).toBeCalledWith(expectedDirectory);
    expect(fs.mkdirSync).toBeCalledWith(expectedDirectory, { recursive: true });
    expect(console.log).toBeCalledWith(
      `Created directory: ${expectedDirectory}`
    );
    expect(console.log).toBeCalledWith(`Writing to ${expectedPath}`);
    expect(fs.writeFileSync).toBeCalledWith(expectedPath, "file content");
    expect(console.log).toBeCalledWith(`Generated ${expectedPath}`);
  });

  // Additional test cases for edge cases, e.g., directory exists, different input values, etc.
});
