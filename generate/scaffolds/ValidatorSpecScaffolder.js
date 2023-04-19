const ValidatorSpecScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data

    const code = `
package ${subdirectory}.controllers.requestParsers.validators

import api.models.errors._
import mocks.MockAppConfig
import support.UnitSpec
import ${subdirectory}.models.request.${packageName}.${endpointName}RawData

class ${endpointName}ValidatorSpec extends UnitSpec with MockAppConfig {

  private val validNino = "AA123456A"

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
