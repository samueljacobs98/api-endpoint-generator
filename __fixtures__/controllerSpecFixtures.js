const controllerSpecFixture = `
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

module.exports = {
    controllerSpecFixture
}