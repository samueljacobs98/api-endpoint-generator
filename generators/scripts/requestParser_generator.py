# requestParser_generator.py

import sys
import os

def generate_request_parser_code(endpoint_name):
    code = f"""import play.api.mvc._
import play.api.libs.json._

class {endpoint_name}RequestParser @Inject()() {{

  def parse(request: Request[AnyContent]): Either[Error, {endpoint_name}Request] = {{
    request.body.asJson
      .flatMap(Json.fromJson[{endpoint_name}Request](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }}
}}
"""

    return code

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 requestParser_generator.py <EndpointName>")
        sys.exit(1)

    endpoint_name = sys.argv[1]
    file_name = f"../api/controllers/requestParsers/{endpoint_name}RequestParser.scala"

    if os.path.exists(file_name):
        print(f"Error: File '{file_name}' already exists.")
        sys.exit(1)

    with open(file_name, "w") as f:
        f.write(generate_request_parser_code(endpoint_name))

    print(f"Generated {file_name}")

if __name__ == "__main__":
    main()
