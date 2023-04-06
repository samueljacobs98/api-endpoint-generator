import play.api.mvc._
import play.api.libs.json._

class NewEndpointAgainRequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, NewEndpointAgainRequest] = {
    request.body.asJson
      .flatMap(Json.fromJson[NewEndpointAgainRequest](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
