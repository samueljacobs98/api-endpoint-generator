import play.api.mvc._
import play.api.libs.json._

class NewEndpoint8RequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, NewEndpoint8Request] = {
    request.body.asJson
      .flatMap(Json.fromJson[NewEndpoint8Request](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
