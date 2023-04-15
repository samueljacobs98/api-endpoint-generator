const ControllerSpecScaffolder = {
  generateCode: (endpointName) => {
    const package = endpointName.replace(/^(.)/, (_, p1) => p1.toLowerCase());

    const code = `
package v2.controllers

import api.controllers.{ControllerBaseSpec, ControllerTestRunner}
import api.mocks.MockIdGenerator
import api.mocks.services.{MockEnrolmentsAuthService, MockMtdIdLookupService}
import api.models.domain.Nino
import api.models.errors._
import api.models.outcomes.ResponseWrapper
import play.api.libs.json.Json
import play.api.mvc.Result
import v2.mocks.requestParsers.Mock${endpointName}RequestParser
import v2.mocks.services.Mock${endpointName}Service
import v2.models.request.${package}._
import v2.models.response.${package}.${endpointName}Response

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ${endpointName}ControllerSpec
  extends ControllerBaseSpec
    with ControllerTestRunner
    with MockEnrolmentsAuthService
    with MockMtdIdLookupService
    with Mock${endpointName}Service
    with Mock${endpointName}RequestParser
    with MockIdGenerator {

  private val submissionId = "submissionId"

  "${endpointName}Controller" should {
    "return a successful response with status 200 (OK)" when {
      "the request received is valid" in new Test {
        Mock${endpointName}RequestParser
          .parse(rawData)
          .returns(Right(requestData))

        Mock${endpointName}Service
          .retrieve(requestData)
          .returns(Future.successful(Right(ResponseWrapper(correlationId, response))))

        runOkTest(expectedStatus = OK, maybeExpectedResponseBody = Some(Json.toJson(response)))
      }
    }

    "return an error as per spec" when {
      "the parser validation fails" in new Test {
        Mock${endpointName}RequestParser
          .parse(rawData)
          .returns(Left(ErrorWrapper(correlationId, BadRequestError, None)))

        runErrorTest(BadRequestError)
      }

      "service errors occur" should {
        "the service returns an error" in new Test {
          Mock${endpointName}RequestParser
            .parse(rawData)
            .returns(Right(requestData))

          Mock${endpointName}Service
            .retrieve(requestData)
            .returns(Future.successful(Left(ErrorWrapper(correlationId, NotFoundError))))

          runErrorTest(NotFoundError)
        }
      }
    }
  }

  private trait Test extends ControllerTest {

    private val controller = new ${endpointName}Controller(
      authService = mockEnrolmentsAuthService,
      lookupService = mockMtdIdLookupService,
      parser = mock${endpointName}RequestParser,
      service = mock${endpointName}Service,
      cc = cc,
      idGenerator = mockIdGenerator
    )

    def callController(): Future[Result] = controller.handleRequest(nino)(fakeRequest)

    val rawData: ${endpointName}RawData = ${endpointName}RawData(nino)

    val requestData: ${endpointName}Request = ${endpointName}Request(Nino(nino))

    val response: ${endpointName}Response = ${endpointName}Response(submissionId)

  }

}
`;

    return code;
  },
};

module.exports = ControllerSpecScaffolder;
