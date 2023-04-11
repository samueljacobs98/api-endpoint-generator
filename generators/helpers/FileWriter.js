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

  #getDirectory() {
    // rootLocation/rootLocationExtension/subdirectory/componentRoute/endpointName{Component}{SpecExtension}.scala
    return `${this.#rootLocation}/${this.#rootLocationExtension}/${
      this.#subdirectory
    }/${this.#componentRoute}`;
  }

  #getFileName() {
    return `/${this.#endpointName}${this.#component}${
      this.#specExtension
    }.scala`;
  }

  #getPath() {
    return `${this.#getDirectory()}${this.#getFileName()}`;
  }

  #confirmDirectoryExists() {
    const directory = this.#getDirectory();
    // Check if the directory exists
    if (!fs.existsSync(directory)) {
      // If it does not exist, create it at the default location
      fs.mkdirSync(directory, { recursive: true });
      console.log(`Created directory: ${directory}`);
    }
  }

  writeFile() {
    this.#confirmDirectoryExists();

    const fileName = this.#getPath();

    fs.writeFileSync(fileName, this.content);
    console.log(`Generated ${fileName}`);
  }

  withPath(path) {
    this.path = path;
    return this;
  }

  withContent(content) {
    this.content = content;
    return this;
  }

  withRootLocation(rootLocation) {
    this.#rootLocation = rootLocation;
    return this;
  }

  withRootLocationExtension(rootLocationExtension) {
    this.#rootLocationExtension = rootLocationExtension;
    return this;
  }

  withSubdirectory(subdirectory) {
    this.#subdirectory = subdirectory;
    return this;
  }

  withComponentRoute(componentRoute) {
    this.#componentRoute = componentRoute;
    return this;
  }

  withEndpointName(endpointName) {
    this.#endpointName = endpointName;
    return this;
  }

  withComponent(component) {
    this.#component = component;
    return this;
  }

  withSpecExtension(specExtension) {
    this.#specExtension = specExtension;
    return this;
  }
}

module.exports = FileWriter;
