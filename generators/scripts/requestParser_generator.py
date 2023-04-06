import sys
import os

EXT="RequestParser"

def generate_code(endpoint_name):
    code = f"""import play.api.mvc._
import play.api.libs.json._

class {endpoint_name}RequestParser @Inject()() {{

  def parse(request: Request[AnyContent]): Either[Error, {endpoint_name}Request] = {{
    request.body.asJson
      .flatMap(Json.fromJson[{endpoint_name}Request](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }}
}}
"""

    return code