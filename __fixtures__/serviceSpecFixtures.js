const serviceSpecFixture = `
package v2.services

import api.controllers.EndpointLogContext
import api.models.domain.Nino
import api.models.errors._
import api.models.outcomes.ResponseWrapper
import support.UnitSpec
import uk.gov.hmrc.http.HeaderCarrier
import v2.mocks.connectors.MockEndpointNameConnector
import v2.models.request.endpointName.EndpointNameRequest
import v2.models.response.endpointName.EndpointNameResponse

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class EndpointNameServiceSpec extends UnitSpec {

  private val nino: String         = "AA123456A"
  private val submissionId: String = "4557ecb5-fd32-48cc-81f5-e6acd1099f3c"

  implicit private val correlationId: String = "X-123"

  "The service" should {
    "map the result" when {
      "the downstream response is successful" in new Test {
        MockEndpointNameConnector
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

          MockEndpointNameConnector
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

  trait Test extends MockEndpointNameConnector {
    implicit protected val hc: HeaderCarrier              = HeaderCarrier()
    implicit protected val logContext: EndpointLogContext = EndpointLogContext("c", "ep")

    protected val service = new EndpointNameService(
      connector = mockEndpointNameConnector
    )

    protected val response: EndpointNameResponse =
      EndpointNameResponse(submissionId)

    protected val requestData: EndpointNameRequest =
      EndpointNameRequest(Nino(nino))
  }

}
`

module.exports = {
    serviceSpecFixture
}