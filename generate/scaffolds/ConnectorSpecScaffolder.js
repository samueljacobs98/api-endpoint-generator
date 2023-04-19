const ConnectorSpecScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data

    const code = `
package ${subdirectory}.connectors

import api.connectors.{ConnectorSpec, DownstreamOutcome}
import api.models.domain.Nino
import api.models.errors.{DownstreamErrorCode, DownstreamErrors}
import api.models.outcomes.ResponseWrapper
import org.scalamock.handlers.CallHandler
import ${subdirectory}.models.request.${packageName}.${endpointName}Request
import ${subdirectory}.models.response.${packageName}.${endpointName}Response

import scala.concurrent.Future

class ${endpointName}ConnectorSpec extends ConnectorSpec {

  private val nino: String         = "AA123456A"
  private val submissionId: String = "submissionId"

  "connect" should {
    "return a valid response" when {
      "a valid request is supplied" in new IfsTest with Test {
        val outcome: Right[Nothing, ResponseWrapper[${endpointName}Response]] =
          Right(ResponseWrapper(correlationId, response))

        stubHttpResponse(outcome)

        private val result = await(connector.connect(request))
        result shouldBe outcome
      }
    }

    "return an error as per the spec" when {
      "an error response received" in new IfsTest with Test {
        private val outcome = Left(ResponseWrapper(correlationId, DownstreamErrors.single(DownstreamErrorCode("SOME_ERROR"))))

        stubHttpResponse(outcome)

        private val result = await(connector.connect(request))
        result shouldBe outcome
      }
    }
  }

  trait Test { _: ConnectorTest =>

    protected val connector: ${endpointName}Connector =
      new ${endpointName}Connector(
        http = mockHttpClient,
        appConfig = mockAppConfig
      )

    def stubHttpResponse(outcome: DownstreamOutcome[${endpointName}Response])
    : CallHandler[Future[DownstreamOutcome[${endpointName}Response]]]#Derived = {
      willGet(
        url = s"$baseUrl/$nino"
      ).returns(Future.successful(outcome))
    }

    protected val request: ${endpointName}Request =
    ${endpointName}Request(Nino(nino))

    protected val response: ${endpointName}Response =
    ${endpointName}Response(submissionId)

  }

}  
`;

    return code;
  },
};

module.exports = ConnectorSpecScaffolder;
