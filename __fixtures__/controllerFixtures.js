const controllerFixture = `
package v2.controllers

import api.controllers.{AuthorisedController, EndpointLogContext, RequestContext, RequestHandler}
import api.services.{EnrolmentsAuthService, MtdIdLookupService}
import play.api.mvc.{Action, AnyContent, ControllerComponents}
import utils.IdGenerator
import v2.controllers.requestParsers.EndpointNameRequestParser
import v2.models.request.endpointName.EndpointNameRawData
import v2.services.EndpointNameService

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

@Singleton
class EndpointNameController @Inject() (val authService: EnrolmentsAuthService,
                                            val lookupService: MtdIdLookupService,
                                            parser: EndpointNameRequestParser,
                                            service: EndpointNameService,
                                            cc: ControllerComponents,
                                            idGenerator: IdGenerator)(implicit ec: ExecutionContext)
  extends AuthorisedController(cc) {

  implicit val endpointLogContext: EndpointLogContext =
    EndpointLogContext(controllerName = "EndpointNameController", endpointName = "endpointName")

  def handleRequest(nino: String): Action[AnyContent] =
    authorisedAction(nino).async { implicit request =>
      implicit val ctx: RequestContext = RequestContext.from(idGenerator, endpointLogContext)

      val rawData = EndpointNameRawData(nino)

      val requestHandler =
        RequestHandler
          .withParser(parser)
          .withService(service.generic)
          .withPlainJsonResult()

      requestHandler.handleRequest(rawData)
    }

}`;

module.exports = {
    controllerFixture
}