const mockConnectorFixture = `
package v2.mocks.connectors

import api.connectors.DownstreamOutcome
import org.scalamock.handlers.CallHandler
import org.scalamock.scalatest.MockFactory
import uk.gov.hmrc.http.HeaderCarrier
import v2.connectors.EndpointNameConnector
import v2.models.request.endpointName.EndpointNameRequest
import v2.models.response.endpointName.EndpointNameResponse

import scala.concurrent.{ExecutionContext, Future}

trait MockEndpointNameConnector extends MockFactory {

  val mockEndpointNameConnector: EndpointNameConnector =
    mock[EndpointNameConnector]

  object MockEndpointNameConnector {

    def connect(requestData: EndpointNameRequest): CallHandler[Future[DownstreamOutcome[EndpointNameResponse]]] = {
      (
        mockEndpointNameConnector
          .connect(_: EndpointNameRequest)(
            _: HeaderCarrier,
            _: ExecutionContext,
            _: String
          )
        )
        .expects(requestData, *, *, *)
    }
  }
}
  `

module.exports = {
    mockConnectorFixture
}