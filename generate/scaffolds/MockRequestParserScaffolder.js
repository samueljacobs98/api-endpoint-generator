const MockRequestParserScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data

    const code = `
package ${subdirectory}.mocks.requestParsers

import api.models.errors.ErrorWrapper
import org.scalamock.handlers.CallHandler
import org.scalamock.scalatest.MockFactory
import ${subdirectory}.controllers.requestParsers.${endpointName}RequestParser
import ${subdirectory}.models.request.${packageName}.{${endpointName}RawData, ${endpointName}Request}

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
