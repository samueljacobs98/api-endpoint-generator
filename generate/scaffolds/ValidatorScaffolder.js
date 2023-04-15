const ValidatorScaffolder = {
  generateCode: (endpointName) => {
    const package = endpointName.replace(/^(.)/, (_, p1) => p1.toLowerCase());

    const code = `
package v2.controllers.requestParsers.validators

import api.controllers.requestParsers.validators.Validator
import api.controllers.requestParsers.validators.validations.NinoValidation
import api.models.errors.MtdError
import v2.models.request.${package}.${endpointName}RawData

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
