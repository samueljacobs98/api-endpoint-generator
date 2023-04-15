const { domains, validateDomain } = require("../../generate/helpers/domains");
const {
  controller,
  controllerSpec,
  requestParser,
  requestParserSpec,
  validator,
  validatorSpec,
  connector,
  connectorSpec,
  service,
  serviceSpec,
} = require("../../generate/helpers/components");

describe("Domains", () => {
  test("all domain contains all components", () => {
    expect(domains.all).toEqual([
      controller,
      controllerSpec,
      requestParser,
      requestParserSpec,
      validator,
      validatorSpec,
      connector,
      connectorSpec,
      serviceSpec,
      service,
    ]);
  });

  test("controllerAll domain contains controller components", () => {
    expect(domains.controllerAll).toEqual([controller, controllerSpec]);
  });

  // Similar tests for requestParserAll, validatorAll, connectorAll, and serviceAll domains
});

describe("validateDomain", () => {
  beforeEach(() => {
    console.log = jest.fn();
    process.exit = jest.fn();
  });

  test("validates valid domain and does not exit process", () => {
    validateDomain("all");

    expect(console.log).not.toBeCalled();
    expect(process.exit).not.toBeCalled();
  });

  test("does not validate invalid domain and exits process", () => {
    validateDomain("invalidDomain");

    expect(process.exit).toBeCalledWith(1);
  });
});
