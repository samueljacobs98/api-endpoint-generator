const MockValidatorScaffolder = {
  generateCode: (endpointName) => {
    const package = endpointName.replace(/^(.)/, (_, p1) => p1.toLowerCase());

    const code = `
package v2.mocks.validators

import org.scalamock.handlers.CallHandler1
import org.scalamock.scalatest.MockFactory
import v2.controllers.requestParsers.validators.${endpointName}Validator
import api.models.errors.MtdError
import v2.models.request.${package}.${endpointName}RawData

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
