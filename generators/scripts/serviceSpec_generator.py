import sys
import os

EXT="ServiceSpec"

def generate_code(endpoint_name):
    code = f"""import scala.concurrent.ExecutionContext.Implicits.global
import org.scalatest._
import org.scalatestplus.play._
import scala.concurrent.Await
import scala.concurrent.duration._

class {endpoint_name}ServiceSpec extends PlaySpec {{

  "{endpoint_name}Service" should {{

    "return a successful {endpoint_name}Response for a valid request" in {{
      val request = {endpoint_name}Request("valid_value")
      val connector = new {endpoint_name}Connector()
      val validator = new {endpoint_name}Validator()
      val service = new {endpoint_name}Service(connector, validator)

      val futureResult = service.handleRequest(request)

      val result = Await.result(futureResult, 5.seconds)

      result mustBe a[Right[_, _]]
      result.right.get mustBe a[{endpoint_name}Response]
      // Add more assertions to check the response content if needed
    }}

    "return an error for an invalid request" in {{
      val request = {endpoint_name}Request("invalid_value")
      val connector = new {endpoint_name}Connector()
      val validator = new {endpoint_name}Validator()
      val service = new {endpoint_name}Service(connector, validator)

      val futureResult = service.handleRequest(request)

      val result = Await.result(futureResult, 5.seconds)

      result mustBe a[Left[_, _]]
      result.left.get.message must include("Invalid {endpoint_name}Request")
    }}
  }}
}}
"""

    return code