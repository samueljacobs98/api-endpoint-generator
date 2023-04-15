const {
  controllerCreator,
  controllerSpecCreator,
  requestParserCreator,
  requestParserSpecCreator,
  validatorCreator,
  validatorSpecCreator,
  connectorCreator,
  connectorSpecCreator,
  serviceCreator,
  serviceSpecCreator,
} = require("../../generate/helpers/ComponentCreators");

const Component = require("../../generate/helpers/Component");
const SpecComponent = require("../../generate/helpers/SpecComponent");

describe("Components", () => {
  test("controller is a Component with expected values", () => {
    const controller = controllerCreator("EndpointName");

    const content = `
package v2.controllers

import api.controllers.{AuthorisedController, EndpointLogContext, RequestContext, RequestHandler}
import api.services.{EnrolmentsAuthService, MtdIdLookupService}
import play.api.mvc.{Action, AnyContent, ControllerComponents}
import utils.IdGenerator
import v2.controllers.endpointName.EndpointNameRequestParser
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

    expect(controller).toBeInstanceOf(Component);
    expect(controller.getComponentRoute()).toBe("controllers");
    expect(controller.getComponent()).toBe("Controller");
    expect(controller.getContent()).toBe(content);
    expect(controller.getRootLocationExtension()).toBe("app");
  });

  test("controllerSpec is a SpecComponent with expected values", () => {
    const controllerSpec = controllerSpecCreator("EndpointName");

    const content = `
package v2.controllers

import api.controllers.{ControllerBaseSpec, ControllerTestRunner}
import api.mocks.MockIdGenerator
import api.mocks.services.{MockEnrolmentsAuthService, MockMtdIdLookupService}
import api.models.domain.Nino
import api.models.errors._
import api.models.outcomes.ResponseWrapper
import play.api.libs.json.Json
import play.api.mvc.Result
import v2.mocks.requestParsers.MockEndpointNameRequestParser
import v2.mocks.services.MockEndpointNameService
import v2.models.request.endpointName._
import v2.models.response.endpointName.EndpointNameResponse

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class EndpointNameControllerSpec
  extends ControllerBaseSpec
    with ControllerTestRunner
    with MockEnrolmentsAuthService
    with MockMtdIdLookupService
    with MockEndpointNameService
    with MockEndpointNameRequestParser
    with MockIdGenerator {

  private val submissionId = "submissionId"

  "EndpointNameController" should {
    "return a successful response with status 200 (OK)" when {
      "the request received is valid" in new Test {
        MockEndpointNameRequestParser
          .parse(rawData)
          .returns(Right(requestData))

        MockEndpointNameService
          .retrieve(requestData)
          .returns(Future.successful(Right(ResponseWrapper(correlationId, response))))

        runOkTest(expectedStatus = OK, maybeExpectedResponseBody = Some(Json.toJson(response)))
      }
    }

    "return an error as per spec" when {
      "the parser validation fails" in new Test {
        MockEndpointNameRequestParser
          .parse(rawData)
          .returns(Left(ErrorWrapper(correlationId, BadRequestError, None)))

        runErrorTest(BadRequestError)
      }

      "service errors occur" should {
        "the service returns an error" in new Test {
          MockEndpointNameRequestParser
            .parse(rawData)
            .returns(Right(requestData))

          MockEndpointNameService
            .retrieve(requestData)
            .returns(Future.successful(Left(ErrorWrapper(correlationId, NotFoundError))))

          runErrorTest(NotFoundError)
        }
      }
    }
  }

  private trait Test extends ControllerTest {

    private val controller = new EndpointNameController(
      authService = mockEnrolmentsAuthService,
      lookupService = mockMtdIdLookupService,
      parser = mockEndpointNameRequestParser,
      service = mockEndpointNameService,
      cc = cc,
      idGenerator = mockIdGenerator
    )

    def callController(): Future[Result] = controller.handleRequest(nino)(fakeRequest)

    val rawData: EndpointNameRawData = EndpointNameRawData(nino)

    val requestData: EndpointNameRequest = EndpointNameRequest(Nino(nino))

    val response: EndpointNameResponse = EndpointNameResponse(submissionId)

  }

}`;

    expect(controllerSpec).toBeInstanceOf(SpecComponent);
    expect(controllerSpec.getComponentRoute()).toBe("controllers");
    expect(controllerSpec.getComponent()).toBe("Controller");
    expect(controllerSpec.getContent()).toBe(content);
    expect(controllerSpec.getRootLocationExtension()).toBe("test");
  });

  // Similar tests for requestParser, requestParserSpec, validator, validatorSpec, connector, connectorSpec, service, and serviceSpec
});
