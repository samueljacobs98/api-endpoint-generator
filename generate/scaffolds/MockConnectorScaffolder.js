const MockConnectorScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data

    const code = `
package ${subdirectory}.mocks.connectors

import api.connectors.DownstreamOutcome
import org.scalamock.handlers.CallHandler
import org.scalamock.scalatest.MockFactory
import uk.gov.hmrc.http.HeaderCarrier
import ${subdirectory}.connectors.${endpointName}Connector
import ${subdirectory}.models.request.${packageName}.${endpointName}Request
import ${subdirectory}.models.response.${packageName}.${endpointName}Response

import scala.concurrent.{ExecutionContext, Future}

trait Mock${endpointName}Connector extends MockFactory {

  val mock${endpointName}Connector: ${endpointName}Connector =
    mock[${endpointName}Connector]

  object Mock${endpointName}Connector {

    def connect(requestData: ${endpointName}Request): CallHandler[Future[DownstreamOutcome[${endpointName}Response]]] = {
      (
        mock${endpointName}Connector
          .connect(_: ${endpointName}Request)(
            _: HeaderCarrier,
            _: ExecutionContext,
            _: String
          )
        )
        .expects(requestData, *, *, *)
    }
  }
}
  `;

    return code;
  },
};

module.exports = MockConnectorScaffolder;
