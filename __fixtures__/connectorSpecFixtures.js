const connectorSpecFixture = `
package v2.connectors

import api.connectors.{ConnectorSpec, DownstreamOutcome}
import api.models.domain.Nino
import api.models.errors.{DownstreamErrorCode, DownstreamErrors}
import api.models.outcomes.ResponseWrapper
import org.scalamock.handlers.CallHandler
import v2.models.request.endpointName.EndpointNameRequest
import v2.models.response.endpointName.EndpointNameResponse

import scala.concurrent.Future

class EndpointNameConnectorSpec extends ConnectorSpec {

  private val nino: String         = "AA123456A"
  private val submissionId: String = "submissionId"

  "connect" should {
    "return a valid response" when {
      "a valid request is supplied" in new IfsTest with Test {
        val outcome: Right[Nothing, ResponseWrapper[EndpointNameResponse]] =
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

    protected val connector: EndpointNameConnector =
      new EndpointNameConnector(
        http = mockHttpClient,
        appConfig = mockAppConfig
      )

    def stubHttpResponse(outcome: DownstreamOutcome[EndpointNameResponse])
    : CallHandler[Future[DownstreamOutcome[EndpointNameResponse]]]#Derived = {
      willGet(
        url = s"$baseUrl/$nino"
      ).returns(Future.successful(outcome))
    }

    protected val request: EndpointNameRequest =
    EndpointNameRequest(Nino(nino))

    protected val response: EndpointNameResponse =
    EndpointNameResponse(submissionId)

  }

}  
`

module.exports = {
    connectorSpecFixture
}