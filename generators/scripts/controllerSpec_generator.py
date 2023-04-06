import sys
import os

EXT="ControllerSpec"

def generate_code(endpoint_name):
    code = f"""import play.api.mvc._
import play.api.test._
import play.api.test.Helpers._
import scala.concurrent.ExecutionContext
import org.scalatestplus.play._
import org.scalatestplus.play.guice._

class {endpoint_name}ControllerSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {{

  implicit val ec: ExecutionContext = ExecutionContext.global

  "{endpoint_name}Controller" should {{

    "respond with 'not implemented yet' when called" in {{
      val controller = new {endpoint_name}Controller(stubControllerComponents())(ec)
      val result = controller.{endpoint_name.lower()}().apply(FakeRequest(GET, "/"))

      status(result) mustBe OK
      contentType(result) mustBe Some("text/plain")
      contentAsString(result) must include("not implemented yet")
    }}
  }}
}}
"""

    return code
