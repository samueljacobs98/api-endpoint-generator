class CreatorData {
    constructor(endpointName, subdirectory) {
        this.endpointName = endpointName;
        this.packageName = endpointName.replace(/^(.)/, (_, p1) => p1.toLowerCase());
        this.subdirectory = subdirectory
    }
}

module.exports = CreatorData