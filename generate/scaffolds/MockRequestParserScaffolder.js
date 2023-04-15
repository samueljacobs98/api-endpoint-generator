const MockRequestParserScaffolder = {
  generateCode: (endpointName) => {
    const packageName = endpointName.replace(/^(.)/, (_, p1) =>
      p1.toLowerCase()
    );

    const code = `
package v2.mocks.requestParsers

import api.models.errors.ErrorWrapper
import org.scalamock.handlers.CallHandler
import org.scalamock.scalatest.MockFactory
import v2.controllers.requestParsers.${endpointName}RequestParser
import v2.models.request.${packageName}.{${endpointName}RawData, ${endpointName}Request}

trait Mock${endpointName}RequestParser extends MockFactory {

  val mock${endpointName}RequestParser: ${endpointName}RequestParser =
    mock[${endpointName}RequestParser]

  object Mock${endpointName}RequestParser {

    def parse(data: ${endpointName}RawData): CallHandler[Either[ErrorWrapper, ${endpointName}Request]] = {
      (mock${endpointName}RequestParser
        .parseRequest(_: ${endpointName}RawData)(_: String))
        .expects(data, *)
    }
  }
}
  `;

    return code;
  },
};

module.exports = MockRequestParserScaffolder;
