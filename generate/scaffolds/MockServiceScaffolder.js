const MockServiceScaffolder = {
  generateCode: (endpointName) => {
    const packageName = endpointName.replace(/^(.)/, (_, p1) =>
      p1.toLowerCase()
    );

    const code = `
package v2.mocks.services

import api.controllers.RequestContext
import api.services.ServiceOutcome
import org.scalamock.handlers.CallHandler
import org.scalamock.scalatest.MockFactory
import v2.models.request.${packageName}.${endpointName}Request
import v2.models.response.${packageName}.${endpointName}Response
import v2.services.${endpointName}Service

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
