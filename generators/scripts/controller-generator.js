function generateCode(endpointName) {
  const code = `import play.api.mvc._
  import play.api.libs.json._
  import scala.concurrent.ExecutionContext
  import javax.inject.Inject
  import play.api.Logging
  
  class ${endpointName}Controller @Inject()(cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with Logging {
  
    def ${endpointName}() = Action.async { implicit request =>
      // Add your implementation for the ${endpointName} endpoint here
      Future.successful(Ok("Endpoint '${endpointName}' not implemented yet"))
    }
  }
  `;

  return code;
}

module.exports = {
  EXT: "Controller",
  generateCode,
};
