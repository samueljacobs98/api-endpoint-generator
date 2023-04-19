const mockValidatorFixture = `
package v2.mocks.validators

import org.scalamock.handlers.CallHandler1
import org.scalamock.scalatest.MockFactory
import api.models.errors.MtdError
import v2.controllers.requestParsers.validators.EndpointNameValidator
import v2.models.request.endpointName.EndpointNameRawData

class MockEndpointNameValidator extends MockFactory {

  val mockValidator: EndpointNameValidator = mock[EndpointNameValidator]

  object MockEndpointNameValidator {
    def validate(data: EndpointNameRawData): CallHandler1[EndpointNameRawData, List[MtdError]] = {
      (mockValidator
        .validate(_: EndpointNameRawData))
        .expects(data)
    }
  }
}
`

module.exports = {
    mockValidatorFixture
}