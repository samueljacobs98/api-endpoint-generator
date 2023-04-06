import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.ExecutionContext
import javax.inject.Inject
import play.api.Logging

class tryagainandagainController @Inject()(cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with Logging {

  def tryagainandagain() = Action.async { implicit request =>
    // Add your implementation for the tryagainandagain endpoint here
    Future.successful(Ok("Endpoint 'tryagainandagain' not implemented yet"))
  }
}
