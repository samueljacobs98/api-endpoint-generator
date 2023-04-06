import sys
import os

EXT="ConnectorsPEC"

def generate_code(endpoint_name):
    code = f"""import scala.concurrent.ExecutionContext.Implicits.global
import org.scalatest._
import org.scalatestplus.play._
import scala.concurrent.Await
import scala.concurrent.duration._

class {endpoint_name}ConnectorSpec extends PlaySpec {{

  "{endpoint_name}Connector" should {{

    "return a successful {endpoint_name}Response" in {{
      val request = {endpoint_name}Request("valid_value")
      val connector = new {endpoint_name}Connector()

      val futureResult = connector.callAPI(request)

      val result = Await.result(futureResult, 5.seconds)

      result mustBe a[{endpoint_name}Response]
      // Add more assertions to check the response content if needed
    }}
  }}
}}
"""

    return code
