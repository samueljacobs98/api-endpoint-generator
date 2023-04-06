import sys
import os

EXT="Controller"

def generate_code(endpoint_name):
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