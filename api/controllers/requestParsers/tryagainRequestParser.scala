import play.api.mvc._
import play.api.libs.json._

class tryagainRequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, tryagainRequest] = {
    request.body.asJson
      .flatMap(Json.fromJson[tryagainRequest](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
