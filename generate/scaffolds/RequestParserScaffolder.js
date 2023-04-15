const RequestParserScaffolder = {
  generateCode: (endpointName) => {
    const packageName = endpointName.replace(/^(.)/, (_, p1) =>
      p1.toLowerCase()
    );

    const code = `
package v2.controllers.requestParsers

import api.controllers.requestParsers.RequestParser
import api.models.domain.Nino

import javax.inject.Inject
import v2.controllers.requestParsers.validators.${endpointName}Validator
import v2.models.request.${packageName}._

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
