class UserInterface {
  async getRootFromUser() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const rootLocation = await new Promise((resolve) =>
      rl.question("Enter the root location of the repository: ", (answer) => {
        rl.close();
        resolve(answer);
      })
    );

    return rootLocation;
  }
}

module.exports = UserInterface;
