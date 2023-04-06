import sys
import os

EXT="ValidatorSpec"

def generate_code(endpoint_name):
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