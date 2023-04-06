import sys
import os

EXT="Validator"

def generate_code(endpoint_name):
    code = f"""class {endpoint_name}Validator @Inject()() {{

  def validate(request: {endpoint_name}Request): Either[Error, {endpoint_name}Request] = {{
    // Add your validation logic here
    Right(request)
  }}
}}
"""

    return code