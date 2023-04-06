# controller_generator.py
import sys
import os

def generate_controller_code(endpoint_name):
    code = f"""import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.ExecutionContext
import javax.inject.Inject
import play.api.Logging

class {endpoint_name}Controller @Inject()(cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with Logging {{

  def {endpoint_name}() = Action.async {{ implicit request =>
    // Add your implementation for the {endpoint_name} endpoint here
    Future.successful(Ok("Endpoint '{endpoint_name}' not implemented yet"))
  }}
}}
"""

    return code

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 controller_generator.py <EndpointName>")
        sys.exit(1)

    endpoint_name = sys.argv[1]
    file_name = f"../api/controllers/{endpoint_name}Controller.scala"

    if os.path.exists(file_name):
        print(f"Error: File '{file_name}' already exists.")
        sys.exit(1)

    with open(file_name, "w") as f:
        f.write(generate_controller_code(endpoint_name))

    print(f"Generated {file_name}")

if __name__ == "__main__":
    main()
