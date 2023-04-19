const requestParserFixture = `
package v2.controllers.requestParsers

import api.controllers.requestParsers.RequestParser
import api.models.domain.Nino

import javax.inject.Inject
import v2.controllers.requestParsers.validators.EndpointNameValidator
import v2.models.request.endpointName._

class EndpointNameRequestParser @Inject()(val validator: EndpointNameValidator)
  extends RequestParser[EndpointNameRawData, EndpointNameRequest] {

  override protected def requestFor(data: EndpointNameRawData): EndpointNameRequest =
  EndpointNameRequest(Nino(data.nino))
}
`

module.exports = {
    requestParserFixture
}