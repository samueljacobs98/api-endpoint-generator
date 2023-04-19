const serviceFixture = `
package v2.services

import api.controllers.RequestContext
import api.models.errors.NinoFormatError
import api.services.{BaseService, ServiceOutcome}
import cats.implicits._
import v2.connectors.EndpointNameConnector
import v2.models.request.endpointName.EndpointNameRequest
import v2.models.response.endpointName.EndpointNameResponse

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class EndpointNameService @Inject() (connector: EndpointNameConnector) extends BaseService {

  def generic(request: EndpointNameRequest)(implicit
    ctx: RequestContext,
    ec: ExecutionContext
  ): Future[ServiceOutcome[EndpointNameResponse]] = {

    connector.connect(request).map(_.leftMap(mapDownstreamErrors(downstreamErrorMap)))
  }

  private val downstreamErrorMap = Map(
    "INVALID_TAXABLE_ENTITY_ID" -> NinoFormatError
  )
  
}
`

module.exports = {
    serviceFixture
}