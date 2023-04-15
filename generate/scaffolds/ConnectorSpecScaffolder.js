const ConnectorSpecScaffolder = {
  generateCode: (endpointName) => {
    const package = endpointName.replace(/^(.)/, (_, p1) => p1.toLowerCase());

    const code = `
package v2.connectors

import api.connectors.{ConnectorSpec, DownstreamOutcome}
import api.models.domain.Nino
import api.models.errors.{DownstreamErrorCode, DownstreamErrors}
import api.models.outcomes.ResponseWrapper
import org.scalamock.handlers.CallHandler
import v2.models.request.${package}.${endpointName}Request
import v2.models.response.${package}.${endpointName}Response

import scala.concurrent.Future

class ${endpointName}ConnectorSpec extends ConnectorSpec {

  private val nino: String         = "AA123456A"
  private val submissionId: String = "submissionId"

  "connect" should {
    "return a valid response" when {
      "a valid request is supplied" in new IfsTest with Test {
        val outcome: Right[Nothing, ResponseWrapper[${endpointName}tResponse]] =
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
    : CallHandler[Future[DownstreamOutcome[${endpointName}tResponse]]]#Derived = {
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
