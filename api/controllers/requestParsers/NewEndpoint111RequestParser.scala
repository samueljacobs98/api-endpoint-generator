import play.api.mvc._
import play.api.libs.json._

class NewEndpoint111RequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, NewEndpoint111Request] = {
    request.body.asJson
      .flatMap(Json.fromJson[NewEndpoint111Request](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
