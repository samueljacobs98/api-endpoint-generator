const RequestParserSpecScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data


    const code = `
package ${subdirectory}.controllers.requestParsers

import support.UnitSpec
import api.models.domain.Nino
import api.models.errors.{ ErrorWrapper, NinoFormatError }
import ${subdirectory}.mocks.validators.Mock${endpointName}Validator
import ${subdirectory}.models.request.${packageName}._

class ${endpointName}RequestParserSpec extends UnitSpec {

  private val nino: String           = "AA123456B"
  implicit val correlationId: String = "X-123"

  private val rawData: ${endpointName}RawData = ${endpointName}RawData(nino)

  private trait Test extends Mock${endpointName}Validator {
    lazy val parser = new ${endpointName}RequestParser(mockValidator)
  }

  "${endpointName}RequestParser" should {
    "return a valid request object" when {
      "valid raw data is supplied" in new Test {
        Mock${endpointName}Validator.validate(rawData).returns(Nil)

        parser.parseRequest(rawData) shouldBe Right(${endpointName}Request(Nino(nino)))
      }
    }

    "return an ErrorWrapper object" when {
      "the raw data contains single validation error" in new Test {

        Mock${endpointName}Validator
          .validate(rawData)
          .returns(List(NinoFormatError))

        parser.parseRequest(rawData) shouldBe
          Left(ErrorWrapper(correlationId, NinoFormatError, None))
      }

    }
  }
}
`;

    return code;
  },
};

module.exports = RequestParserSpecScaffolder;
