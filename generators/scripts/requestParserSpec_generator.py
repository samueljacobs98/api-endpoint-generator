# requestParserSpec_generator.py

import sys
import os

def generate_request_parser_spec_code(endpoint_name):
    code = f"""import play.api.mvc._
import play.api.libs.json._
import org.scalatest._
import org.scalatestplus.play._
import play.api.test.Helpers._

class {endpoint_name}RequestParserSpec extends PlaySpec {{

  "{endpoint_name}RequestParser" should {{

    "parse a valid JSON request" in {{
      val json = Json.parse("{{\\"your_field\\": \\"your_value\\"}}")
      val request = FakeRequest().withBody(AnyContentAsJson(json))
      val parser = new {endpoint_name}RequestParser()

      val result = parser.parse(request)

      result mustBe a[Right[_, _]]
      result.right.get.yourField mustBe "your_value"
    }}

    "return an error for an invalid JSON request" in {{
      val json = Json.parse("{{\\"invalid_field\\": \\"invalid_value\\"}}")
      val request = FakeRequest().withBody(AnyContentAsJson(json))
      val parser = new {endpoint_name}RequestParser()

      val result = parser.parse(request)

      result mustBe a[Left[_, _]]
      result.left.get.message must include("Invalid JSON format")
    }}
  }}
}}
"""

    return code

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 requestParserSpec_generator.py <EndpointName>")
        sys.exit(1)

    endpoint_name = sys.argv[1]
    output_directory = "../test/controllers/requestParsers"
    file_name = f"{output_directory}/{endpoint_name}RequestParserSpec.scala"

    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    if os.path.exists(file_name):
        print(f"Error: File '{file_name}' already exists.")
        sys.exit(1)

    with open(file_name, "w") as f:
        f.write(generate_request_parser_spec_code(endpoint_name))

    print(f"Generated {file_name}")

if __name__ == "__main__":
    main()
