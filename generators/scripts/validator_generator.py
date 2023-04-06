# validator_generator.py

import sys
import os

def generate_validator_code(endpoint_name):
    code = f"""class {endpoint_name}Validator @Inject()() {{

  def validate(request: {endpoint_name}Request): Either[Error, {endpoint_name}Request] = {{
    // Add your validation logic here
    Right(request)
  }}
}}
"""

    return code

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 validator_generator.py <EndpointName>")
        sys.exit(1)

    endpoint_name = sys.argv[1]
    file_name = f"../api/controllers/requestParsers/validators/{endpoint_name}Validator.scala"

    if os.path.exists(file_name):
        print(f"Error: File '{file_name}' already exists.")
        sys.exit(1)

    with open(file_name, "w") as f:
        f.write(generate_validator_code(endpoint_name))

    print(f"Generated {file_name}")

if __name__ == "__main__":
    main()
