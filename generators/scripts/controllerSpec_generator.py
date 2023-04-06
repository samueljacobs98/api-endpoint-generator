# controllerSpec_generator.py

import sys
import os

def generate_controller_spec_code(endpoint_name):
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

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 controllerSpec_generator.py <EndpointName>")
        sys.exit(1)

    endpoint_name = sys.argv[1]
    output_directory = "../test/controllers"
    file_name = f"{output_directory}/{endpoint_name}ControllerSpec.scala"

    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    if os.path.exists(file_name):
        print(f"Error: File '{file_name}' already exists.")
        sys.exit(1)

    with open(file_name, "w") as f:
        f.write(generate_controller_spec_code(endpoint_name))

    print(f"Generated {file_name}")

if __name__ == "__main__":
    main()
