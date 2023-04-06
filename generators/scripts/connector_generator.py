# connector_generator.py

import sys
import os

def generate_connector_code(endpoint_name):
    code = f"""import scala.concurrent.Future

class {endpoint_name}Connector @Inject()()(implicit ec: ExecutionContext) {{

  def callAPI(request: {endpoint_name}Request): Future[{endpoint_name}Response] = {{
    // Add your API call implementation here
    Future.successful({endpoint_name}Response("Not implemented yet"))
  }}
}}
"""

    return code

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 connector_generator.py <EndpointName>")
        sys.exit(1)

    endpoint_name = sys.argv[1]
    output_directory = "../test/connectors"
    file_name = f"{output_directory}/{endpoint_name}Connector.scala"

    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    if os.path.exists(file_name):
        print(f"Error: File '{file_name}' already exists.")
        sys.exit(1)

    with open(file_name, "w") as f:
        f.write(generate_connector_code(endpoint_name))

    print(f"Generated {file_name}")

if __name__ == "__main__":
    main()
