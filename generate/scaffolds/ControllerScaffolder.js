const ControllerScaffolder = {
  generateCode: (endpointName) => {
    const package = endpointName.replace(/^(.)/, (_, p1) => p1.toLowerCase());

    const code = `
package v2.controllers

import api.controllers.{AuthorisedController, EndpointLogContext, RequestContext, RequestHandler}
import api.services.{EnrolmentsAuthService, MtdIdLookupService}
import play.api.mvc.{Action, AnyContent, ControllerComponents}
import utils.IdGenerator
import v2.controllers.${package}.${endpointName}RequestParser
import v2.models.request.${package}.${endpointName}RawData
import v2.services.${endpointName}Service

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
    EndpointLogContext(controllerName = "${endpointName}Controller", endpointName = "${package}")

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

}  
  `;

    return code;
  },
};

module.exports = ControllerScaffolder;
