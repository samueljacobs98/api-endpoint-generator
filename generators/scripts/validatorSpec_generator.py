# validatorSpec_generator.py

import sys
import os

def generate_validator_spec_code(endpoint_name):
    code = f"""import org.scalatest._
import org.scalatestplus.play._

class {endpoint_name}ValidatorSpec extends PlaySpec {{

  "{endpoint_name}Validator" should {{

    "validate a correct {endpoint_name}Request" in {{
      val request = {endpoint_name}Request("valid_value")
      val validator = new {endpoint_name}Validator()

      val result = validator.validate(request)

      result mustBe a[Right[_, _]]
      result.right.get mustBe request
    }}

    "return an error for an incorrect {endpoint_name}Request" in {{
      val request = {endpoint_name}Request("invalid_value")
      val validator = new {endpoint_name}Validator()

      val result = validator.validate(request)

      result mustBe a[Left[_, _]]
      result.left.get.message must include("Invalid {endpoint_name}Request")
    }}
  }}
}}
"""

    return code

def main():
    if len(sys.argv) != 2:
        print("Usage: python validatorSpec_generator.py <EndpointName>")
        sys.exit(1)

    endpoint_name = sys.argv[1]
    output_directory = "../test/controllers/requestParsers/validators"
    file_name = f"{output_directory}/{endpoint_name}ValidatorSpec.scala"

    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    if os.path.exists(file_name):
        print(f"Error: File '{file_name}' already exists.")
        sys.exit(1)

    with open(file_name, "w") as f:
        f.write(generate_validator_spec_code(endpoint_name))

    print(f"Generated {file_name}")

if __name__ == "__main__":
    main()
