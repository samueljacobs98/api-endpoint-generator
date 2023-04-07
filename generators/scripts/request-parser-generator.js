function generateCode(endpointName) {
  const code = `import play.api.mvc._
  import play.api.libs.json._
  
  class ${endpointName}RequestParser @Inject()() {
  
    def parse(request: Request[AnyContent]): Either[Error, ${endpointName}Request] = {
      request.body.asJson
        .flatMap(Json.fromJson[${endpointName}Request](_).asOpt)
        .toRight(Error("Invalid JSON format"))
    }
  }
  `;

  return code;
}

module.exports = {
  EXT: "RequestParser",
  generateCode,
};
