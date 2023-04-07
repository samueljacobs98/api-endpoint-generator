import sys
import os

EXT="Service"

def generate_code(endpoint_name):
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