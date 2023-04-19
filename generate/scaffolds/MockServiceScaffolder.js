const MockServiceScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data

    const code = `
package ${subdirectory}.mocks.services

import api.controllers.RequestContext
import api.services.ServiceOutcome
import org.scalamock.handlers.CallHandler
import org.scalamock.scalatest.MockFactory
import ${subdirectory}.models.request.${packageName}.${endpointName}Request
import ${subdirectory}.models.response.${packageName}.${endpointName}Response
import ${subdirectory}.services.${endpointName}Service

import scala.concurrent.{ExecutionContext, Future}

trait Mock${endpointName}Service extends MockFactory {

  val mock${endpointName}Service: ${endpointName}Service =
    mock[${endpointName}Service]

  object Mock${endpointName}Service {
    def retrieve(requestData: ${endpointName}Request)
    : CallHandler[Future[ServiceOutcome[${endpointName}Response]]] = {
      (
        mock${endpointName}Service
          .generic(_: ${endpointName}Request)(
            _: RequestContext,
            _: ExecutionContext
          )
        )
        .expects(requestData, *, *)
    }
  }
}
`;

    return code;
  },
};

module.exports = MockServiceScaffolder;
