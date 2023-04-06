import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.ExecutionContext
import javax.inject.Inject
import play.api.Logging

class NewEndpointAgainController @Inject()(cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with Logging {

  def NewEndpointAgain() = Action.async { implicit request =>
    // Add your implementation for the NewEndpointAgain endpoint here
    Future.successful(Ok("Endpoint 'NewEndpointAgain' not implemented yet"))
  }
}
