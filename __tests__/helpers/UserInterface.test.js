const readline = require("readline");
const UserInterface = require("../../generators/helpers/UserInterface");

jest.mock("readline");

describe("UserInterface", () => {
  let userInterface;
  let rlMock;

  beforeEach(() => {
    userInterface = new UserInterface();
    rlMock = {
      question: jest.fn(),
      close: jest.fn(),
    };
    readline.createInterface.mockReturnValue(rlMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getRootFromUser creates readline interface and returns user input", async () => {
    const rootLocation = "/path/to/repository";

    rlMock.question.mockImplementation((_, callback) => {
      callback(rootLocation);
    });

    const result = await userInterface.getRootFromUser();

    expect(readline.createInterface).toBeCalledWith({
      input: process.stdin,
      output: process.stdout,
    });
    expect(rlMock.question).toBeCalledWith(
      "Enter the root location of the repository: ",
      expect.any(Function)
    );
    expect(rlMock.close).toBeCalled();
    expect(result).toBe(rootLocation);
  });

  // Additional test cases for edge cases, e.g., empty user input, different input values, etc.
});
