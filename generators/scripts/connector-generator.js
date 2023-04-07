function generateCode(endpointName) {
  const code = `import scala.concurrent.Future;
  
  class ${endpointName}Connector @Inject()()(implicit ec: ExecutionContext) {
  
    def callAPI(request: ${endpointName}Request): Future[${endpointName}Response] = {
      // Add your API call implementation here
      Future.successful(${endpointName}Response("Not implemented yet"))
    }
  }
  `;

  return code;
}

module.exports = {
  EXT: "Connector",
  generateCode,
};
