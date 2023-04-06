import play.api.mvc._
import play.api.libs.json._

class NewEndpoint89898RequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, NewEndpoint89898Request] = {
    request.body.asJson
      .flatMap(Json.fromJson[NewEndpoint89898Request](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
