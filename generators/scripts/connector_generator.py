import sys
import os

EXT="Connector"

def generate_code(endpoint_name):
    code = f"""import scala.concurrent.Future

class {endpoint_name}Connector @Inject()()(implicit ec: ExecutionContext) {{

  def callAPI(request: {endpoint_name}Request): Future[{endpoint_name}Response] = {{
    // Add your API call implementation here
    Future.successful({endpoint_name}Response("Not implemented yet"))
  }}
}}
"""

    return code