const fs = require("fs");

class FileWriter {
  #content = "";
  #rootLocation = "";
  #rootLocationExtension = "";
  #subdirectory = "";
  #componentRoute = "";
  #endpointName = "";
  #component = "";
  #specExtension = "";
  #mockExtension = "";

  constructor({
    rootLocation,
    subdirectory,
    endpointName,
    rootLocationExtension,
    componentRoute,
    component,
    content,
    specExtension,
    mockExtension,
  }) {
    this.#rootLocation = rootLocation;
    this.#subdirectory = subdirectory;
    this.#endpointName = endpointName;
    this.#rootLocationExtension = rootLocationExtension;
    this.#componentRoute = componentRoute;
    this.#component = component;
    this.#content = content;
    this.#specExtension = specExtension;
    this.#mockExtension = mockExtension;
  }

  #getDirectory() {
    const subdirectory =
      this.#subdirectory == "" ? this.#subdirectory : `/${this.#subdirectory}`;

    return `${this.#rootLocation}/${
      this.#rootLocationExtension
    }${subdirectory}/${this.#componentRoute}`;
  }

  #getFileName() {
    const fileName = `/${this.#mockExtension}${this.#endpointName}${
      this.#component
    }${this.#specExtension}.scala`;
    return fileName;
  }

  #getPath() {
    return `${this.#getDirectory()}${this.#getFileName()}`;
  }

  #confirmDirectoryExists() {
    const directory = this.#getDirectory();
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
      console.log(`Created directory: ${directory}`);
    }
  }

  writeFile() {
    this.#confirmDirectoryExists();

    const fileName = this.#getPath();
    console.log(`Writing to ${fileName}`);

    fs.writeFileSync(fileName, this.#content);
    console.log(`Generated ${fileName}`);
  }
}

module.exports = FileWriter;
