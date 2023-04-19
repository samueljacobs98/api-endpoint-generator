const ControllerScaffolder = {
  generateCode: (endpointData) => {
    const { endpointName, packageName, subdirectory } = endpointData

    const code = `
package ${subdirectory}.controllers

import api.controllers.{AuthorisedController, EndpointLogContext, RequestContext, RequestHandler}
import api.services.{EnrolmentsAuthService, MtdIdLookupService}
import play.api.mvc.{Action, AnyContent, ControllerComponents}
import utils.IdGenerator
import ${subdirectory}.controllers.requestParsers.${endpointName}RequestParser
import ${subdirectory}.models.request.${packageName}.${endpointName}RawData
import ${subdirectory}.services.${endpointName}Service

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

@Singleton
class ${endpointName}Controller @Inject() (val authService: EnrolmentsAuthService,
                                            val lookupService: MtdIdLookupService,
                                            parser: ${endpointName}RequestParser,
                                            service: ${endpointName}Service,
                                            cc: ControllerComponents,
                                            idGenerator: IdGenerator)(implicit ec: ExecutionContext)
  extends AuthorisedController(cc) {

  implicit val endpointLogContext: EndpointLogContext =
    EndpointLogContext(controllerName = "${endpointName}Controller", endpointName = "${packageName}")

  def handleRequest(nino: String): Action[AnyContent] =
    authorisedAction(nino).async { implicit request =>
      implicit val ctx: RequestContext = RequestContext.from(idGenerator, endpointLogContext)

      val rawData = ${endpointName}RawData(nino)

      val requestHandler =
        RequestHandler
          .withParser(parser)
          .withService(service.generic)
          .withPlainJsonResult()

      requestHandler.handleRequest(rawData)
    }

}`;

    return code;
  },
};

module.exports = ControllerScaffolder;
