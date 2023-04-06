# service_generator.py

import sys
import os

def generate_service_code(endpoint_name):
    code = f"""import scala.concurrent.Future

class {endpoint_name}Service @Inject()({endpoint_name.lower()}Connector: {endpoint_name}Connector, {endpoint_name.lower()}Validator: {endpoint_name}Validator) (implicit ec: ExecutionContext) {{

  def handleRequest(request: {endpoint_name}Request): Future[Either[Error, {endpoint_name}Response]] = {{
    {endpoint_name.lower()}Validator.validate(request) match {{
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        {endpoint_name.lower()}Connector.callAPI(validatedRequest).map(response => Right(response))
    }}
  }}
}}
"""

    return code

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 service_generator.py <EndpointName>")
        sys.exit(1)

    endpoint_name = sys.argv[1]
    file_name = f"../api/services/{endpoint_name}Service.scala"

    if os.path.exists(file_name):
        print(f"Error: File '{file_name}' already exists.")
        sys.exit(1)

    with open(file_name, "w") as f:
        f.write(generate_service_code(endpoint_name))

    print(f"Generated {file_name}")

if __name__ == "__main__":
    main()
