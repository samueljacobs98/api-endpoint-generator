const validatorFixture = `
package v2.controllers.requestParsers.validators

import api.controllers.requestParsers.validators.Validator
import api.controllers.requestParsers.validators.validations.NinoValidation
import api.models.errors.MtdError
import v2.models.request.endpointName.EndpointNameRawData

import javax.inject.{Inject, Singleton}

@Singleton
class EndpointNameValidator @Inject()()
  extends Validator[EndpointNameRawData] {

  private val validationSet   = List(parameterFormatValidation)

  private def parameterFormatValidation: EndpointNameRawData => List[List[MtdError]] =
    (data: EndpointNameRawData) => {
      List(
        NinoValidation.validate(data.nino),
      )
    }

  override def validate(data: EndpointNameRawData): List[MtdError] = {
    run(validationSet, data).distinct
  }
}
`

module.exports = {
    validatorFixture
}