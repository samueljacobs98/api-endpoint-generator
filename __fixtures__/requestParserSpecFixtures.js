const requestParserSpecFixture = `
package v2.controllers.requestParsers

import support.UnitSpec
import api.models.domain.Nino
import api.models.errors.{ ErrorWrapper, NinoFormatError }
import v2.mocks.validators.MockEndpointNameValidator
import v2.models.request.endpointName._

class EndpointNameRequestParserSpec extends UnitSpec {

  private val nino: String           = "AA123456B"
  implicit val correlationId: String = "X-123"

  private val rawData: EndpointNameRawData = EndpointNameRawData(nino)

  private trait Test extends MockEndpointNameValidator {
    lazy val parser = new EndpointNameRequestParser(mockValidator)
  }

  "EndpointNameRequestParser" should {
    "return a valid request object" when {
      "valid raw data is supplied" in new Test {
        MockEndpointNameValidator.validate(rawData).returns(Nil)

        parser.parseRequest(rawData) shouldBe Right(EndpointNameRequest(Nino(nino)))
      }
    }

    "return an ErrorWrapper object" when {
      "the raw data contains single validation error" in new Test {

        MockEndpointNameValidator
          .validate(rawData)
          .returns(List(NinoFormatError))

        parser.parseRequest(rawData) shouldBe
          Left(ErrorWrapper(correlationId, NinoFormatError, None))
      }

    }
  }
}
`

module.exports = {
    requestParserSpecFixture
}