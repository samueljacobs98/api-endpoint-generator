const ValidatorSpecScaffolder = {
  generateCode: (endpointName) => {
    const packageName = endpointName.replace(/^(.)/, (_, p1) =>
      p1.toLowerCase()
    );

    const code = `
package v2.controllers.requestParsers.validators

import api.models.errors._
import mocks.MockAppConfig
import support.UnitSpec
import v2.models.request.${packageName}.${endpointName}RawData

class ${endpointName}ValidatorSpec extends UnitSpec with MockAppConfig {

  private val validNino       = "AA123456A"

  private val validator = new ${endpointName}Validator()

  "running a validation" should {
    "return no errors" when {
      "a valid request is supplied" in {
        validator.validate(${endpointName}RawData(validNino)) shouldBe Nil
      }
    }
    "return a path parameter format error" when {
      "an invalid nino is supplied" in {
        validator.validate(${endpointName}RawData("invalid")) shouldBe List(NinoFormatError)
      }
    }
  }
}
  `;

    return code;
  },
};

module.exports = ValidatorSpecScaffolder;
