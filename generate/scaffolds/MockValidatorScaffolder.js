const MockValidatorScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data

    const code = `
package ${subdirectory}.mocks.validators

import org.scalamock.handlers.CallHandler1
import org.scalamock.scalatest.MockFactory
import api.models.errors.MtdError
import ${subdirectory}.controllers.requestParsers.validators.${endpointName}Validator
import ${subdirectory}.models.request.${packageName}.${endpointName}RawData

class Mock${endpointName}Validator extends MockFactory {

  val mockValidator: ${endpointName}Validator = mock[${endpointName}Validator]

  object Mock${endpointName}Validator {
    def validate(data: ${endpointName}RawData): CallHandler1[${endpointName}RawData, List[MtdError]] = {
      (mockValidator
        .validate(_: ${endpointName}RawData))
        .expects(data)
    }
  }
}
`;

    return code;
  },
};

module.exports = MockValidatorScaffolder;
