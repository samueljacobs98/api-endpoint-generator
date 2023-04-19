const mockRequestParserFixture = `
package v2.mocks.requestParsers

import api.models.errors.ErrorWrapper
import org.scalamock.handlers.CallHandler
import org.scalamock.scalatest.MockFactory
import v2.controllers.requestParsers.EndpointNameRequestParser
import v2.models.request.endpointName.{EndpointNameRawData, EndpointNameRequest}

trait MockEndpointNameRequestParser extends MockFactory {

  val mockEndpointNameRequestParser: EndpointNameRequestParser =
    mock[EndpointNameRequestParser]

  object MockEndpointNameRequestParser {

    def parse(data: EndpointNameRawData): CallHandler[Either[ErrorWrapper, EndpointNameRequest]] = {
      (mockEndpointNameRequestParser
        .parseRequest(_: EndpointNameRawData)(_: String))
        .expects(data, *)
    }
  }
}
  `

module.exports = {
    mockRequestParserFixture
}