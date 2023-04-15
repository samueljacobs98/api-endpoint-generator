const { Domains, validateDomain } = require("../../generate/helpers/Domains");

describe("Domains", () => {
  it("should have the correct domain subsets", () => {
    expect(Domains).toHaveProperty("all");
    expect(Domains).toHaveProperty("controllerAll");
    expect(Domains).toHaveProperty("requestParserAll");
    expect(Domains).toHaveProperty("validatorAll");
    expect(Domains).toHaveProperty("connectorAll");
    expect(Domains).toHaveProperty("serviceAll");
    expect(Domains).toHaveProperty("dataAll");
    expect(Domains).toHaveProperty("mocks");
  });

  it("should validate a valid domain", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const processExitSpy = jest.spyOn(process, "exit").mockImplementation();

    validateDomain("controllerAll");

    expect(consoleSpy).not.toHaveBeenCalled();
    expect(processExitSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("should not validate an invalid domain", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const processExitSpy = jest.spyOn(process, "exit").mockImplementation();

    validateDomain("invalidDomain");

    expect(consoleSpy).toHaveBeenCalledWith("Invalid domain");
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
