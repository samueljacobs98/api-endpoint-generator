const mockServiceFixture = `
package v2.mocks.services

import api.controllers.RequestContext
import api.services.ServiceOutcome
import org.scalamock.handlers.CallHandler
import org.scalamock.scalatest.MockFactory
import v2.models.request.endpointName.EndpointNameRequest
import v2.models.response.endpointName.EndpointNameResponse
import v2.services.EndpointNameService

import scala.concurrent.{ExecutionContext, Future}

trait MockEndpointNameService extends MockFactory {

  val mockEndpointNameService: EndpointNameService =
    mock[EndpointNameService]

  object MockEndpointNameService {
    def retrieve(requestData: EndpointNameRequest)
    : CallHandler[Future[ServiceOutcome[EndpointNameResponse]]] = {
      (
        mockEndpointNameService
          .generic(_: EndpointNameRequest)(
            _: RequestContext,
            _: ExecutionContext
          )
        )
        .expects(requestData, *, *)
    }
  }
}
`

module.exports = {
    mockServiceFixture
}