const ValidatorScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data


    const code = `
package ${subdirectory}.controllers.requestParsers.validators

import api.controllers.requestParsers.validators.Validator
import api.controllers.requestParsers.validators.validations.NinoValidation
import api.models.errors.MtdError
import ${subdirectory}.models.request.${packageName}.${endpointName}RawData

import javax.inject.{Inject, Singleton}

@Singleton
class ${endpointName}Validator @Inject()()
  extends Validator[${endpointName}RawData] {

  private val validationSet   = List(parameterFormatValidation)

  private def parameterFormatValidation: ${endpointName}RawData => List[List[MtdError]] =
    (data: ${endpointName}RawData) => {
      List(
        NinoValidation.validate(data.nino),
      )
    }

  override def validate(data: ${endpointName}RawData): List[MtdError] = {
    run(validationSet, data).distinct
  }
}
`;

    return code;
  },
};

module.exports = ValidatorScaffolder;
