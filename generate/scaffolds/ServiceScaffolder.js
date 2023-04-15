const ServiceScaffolder = {
  generateCode: (endpointName) => {
    const packageName = endpointName.replace(/^(.)/, (_, p1) =>
      p1.toLowerCase()
    );

    const code = `
package v2.services

import api.controllers.RequestContext
import api.models.errors.NinoFormatError
import api.services.{BaseService, ServiceOutcome}
import cats.implicits._
import v2.connectors.${endpointName}Connector
import v2.models.request.${packageName}.${endpointName}Request
import v2.models.response.${packageName}.${endpointName}Response

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ${endpointName}Service @Inject() (connector: ${endpointName}Connector) extends BaseService {

  def generic(request: ${endpointName}Request)(implicit
    ctx: RequestContext,
    ec: ExecutionContext
  ): Future[ServiceOutcome[${endpointName}Response]] = {

    connector.connect(request).map(_.leftMap(mapDownstreamErrors(downstreamErrorMap)))
  }

  private val downstreamErrorMap = Map(
    "INVALID_TAXABLE_ENTITY_ID" -> NinoFormatError
  )
  
}
  `;

    return code;
  },
};

module.exports = ServiceScaffolder;
