const validatorSpecFixture = `
package v2.controllers.requestParsers.validators

import api.models.errors._
import mocks.MockAppConfig
import support.UnitSpec
import v2.models.request.endpointName.EndpointNameRawData

class EndpointNameValidatorSpec extends UnitSpec with MockAppConfig {

  private val validNino = "AA123456A"

  private val validator = new EndpointNameValidator()

  "running a validation" should {
    "return no errors" when {
      "a valid request is supplied" in {
        validator.validate(EndpointNameRawData(validNino)) shouldBe Nil
      }
    }
    "return a path parameter format error" when {
      "an invalid nino is supplied" in {
        validator.validate(EndpointNameRawData("invalid")) shouldBe List(NinoFormatError)
      }
    }
  }
}
`

module.exports = {
    validatorSpecFixture
}