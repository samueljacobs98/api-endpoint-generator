const ServiceSpecScaffolder = {
  generateCode: (endpointName) => {
    const package = endpointName.replace(/^(.)/, (_, p1) => p1.toLowerCase());

    const code = `
package v2.services

import api.controllers.EndpointLogContext
import api.models.domain.Nino
import api.models.errors._
import api.models.outcomes.ResponseWrapper
import support.UnitSpec
import uk.gov.hmrc.http.HeaderCarrier
import v2.mocks.connectors.Mock${endpointName}Connector
import v2.models.request.${package}.${endpointName}Request
import v2.models.response.${package}.${endpointName}Response

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ${endpointName}ServiceSpec extends UnitSpec {

  private val nino: String         = "AA123456A"
  private val submissionId: String = "4557ecb5-fd32-48cc-81f5-e6acd1099f3c"

  implicit private val correlationId: String = "X-123"

  "The service" should {
    "map the result" when {
      "the downstream response is successful" in new Test {
        Mock${endpointName}Connector
          .connect(requestData)
          .returns(Future.successful(Right(ResponseWrapper(correlationId, response))))

        await(service.generic(requestData)) shouldBe Right(ResponseWrapper(correlationId, response))
      }
    }
  }

  "The service" should {
    "map errors according to spec" when {

      def serviceError(downstreamErrorCode: String, error: MtdError): Unit =
        s"a $downstreamErrorCode error is returned from the service" in new Test {

          Mock${endpointName}Connector
            .connect(requestData)
            .returns(Future.successful(Left(ResponseWrapper(correlationId, DownstreamErrors.single(DownstreamErrorCode(downstreamErrorCode))))))

          await(service.generic(requestData)) shouldBe Left(ErrorWrapper(correlationId, error))
        }

      val errors = List(
        "INVALID_TAXABLE_ENTITY_ID" -> NinoFormatError
      )

      errors.foreach(args => (serviceError _).tupled(args))
    }
  }

  trait Test extends Mock${endpointName}Connector {
    implicit protected val hc: HeaderCarrier              = HeaderCarrier()
    implicit protected val logContext: EndpointLogContext = EndpointLogContext("c", "ep")

    protected val service = new ${endpointName}Service(
      connector = mock${endpointName}Connector
    )

    protected val response: ${endpointName}Response =
      ${endpointName}Response(submissionId)

    protected val requestData: ${endpointName}Request =
      ${endpointName}Request(Nino(nino))
  }

}
  `;

    return code;
  },
};

module.exports = ServiceSpecScaffolder;
