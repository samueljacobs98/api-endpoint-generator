import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.ExecutionContext
import javax.inject.Inject
import play.api.Logging

class PropertyBusinessController @Inject()(cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with Logging {

  def PropertyBusiness() = Action.async { implicit request =>
    // Add your implementation for the PropertyBusiness endpoint here
    Future.successful(Ok("Endpoint 'PropertyBusiness' not implemented yet"))
  }
}
