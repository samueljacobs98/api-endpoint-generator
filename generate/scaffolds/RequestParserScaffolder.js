const RequestParserScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data


    const code = `
package ${subdirectory}.controllers.requestParsers

import api.controllers.requestParsers.RequestParser
import api.models.domain.Nino

import javax.inject.Inject
import ${subdirectory}.controllers.requestParsers.validators.${endpointName}Validator
import ${subdirectory}.models.request.${packageName}._

class ${endpointName}RequestParser @Inject()(val validator: ${endpointName}Validator)
  extends RequestParser[${endpointName}RawData, ${endpointName}Request] {

  override protected def requestFor(data: ${endpointName}RawData): ${endpointName}Request =
  ${endpointName}Request(Nino(data.nino))
}
`;

    return code;
  },
};

module.exports = RequestParserScaffolder;
