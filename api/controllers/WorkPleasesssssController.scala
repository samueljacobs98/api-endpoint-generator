import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.ExecutionContext
import javax.inject.Inject
import play.api.Logging

class WorkPleasesssssController @Inject()(cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with Logging {

  def WorkPleasesssss() = Action.async { implicit request =>
    // Add your implementation for the WorkPleasesssss endpoint here
    Future.successful(Ok("Endpoint 'WorkPleasesssss' not implemented yet"))
  }
}
