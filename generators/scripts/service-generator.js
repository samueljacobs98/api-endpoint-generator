function generateCode(endpointName) {
  const code = `import scala.concurrent.Future
  
  class ${endpointName}Service @Inject()(${endpointName.toLowerCase()}Connector: ${endpointName}Connector, ${endpointName.toLowerCase()}Validator: ${endpointName}Validator) (implicit ec: ExecutionContext) {
  
    def handleRequest(request: ${endpointName}Request): Future[Either[Error, ${endpointName}Response]] = {
      ${endpointName.toLowerCase()}Validator.validate(request) match {
        case Left(error) => Future.successful(Left(error))
        case Right(validatedRequest) =>
          ${endpointName.toLowerCase()}Connector.callAPI(validatedRequest).map(response => Right(response))
      }
    }
  }
  `;

  return code;
}

module.exports = {
  EXT: "Service",
  generateCode,
};
