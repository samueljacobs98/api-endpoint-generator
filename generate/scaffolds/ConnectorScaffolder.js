const ConnectorScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data


    const code = `
package ${subdirectory}.connectors

import api.connectors.{BaseDownstreamConnector, DownstreamOutcome}
import api.connectors.DownstreamUri.IfsUri
import api.connectors.httpparsers.StandardDownstreamHttpParser._
import config.AppConfig
import uk.gov.hmrc.http.{HeaderCarrier, HttpClient}
import ${subdirectory}.models.request.${packageName}.${endpointName}Request
import ${subdirectory}.models.response.${packageName}.${endpointName}Response

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ${endpointName}Connector @Inject() (val http: HttpClient, val appConfig: AppConfig) extends BaseDownstreamConnector {

  def connect(request: ${endpointName}Request)(implicit
    hc: HeaderCarrier,
    ec: ExecutionContext,
    correlationId: String): Future[DownstreamOutcome[${endpointName}Response]] = {

    import request._

    val downstreamUri = IfsUri[${endpointName}Response](s"$nino")

    get(downstreamUri)
  }

}
`;

    return code;
  },
};

module.exports = ConnectorScaffolder;
