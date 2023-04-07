function generateCode(endpointName) {
  const code = `class ${endpointName}Validator {
  
    validate(request) {
      // Add your validation logic here
      return request;
    }
  }
  `;

  return code;
}

module.exports = {
  EXT: "Validator",
  generateCode,
};
