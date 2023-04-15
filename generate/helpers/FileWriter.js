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

  withContent(content) {
    this.#content = content;
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

  withMockExtension(mockExtension) {
    this.#mockExtension = mockExtension;
    return this;
  }

  #getDirectory() {
    return `${this.#rootLocation}/${this.#rootLocationExtension}/${
      this.#subdirectory
    }/${this.#componentRoute}`;
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
