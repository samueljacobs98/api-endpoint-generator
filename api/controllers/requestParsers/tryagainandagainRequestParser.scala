import play.api.mvc._
import play.api.libs.json._

class tryagainandagainRequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, tryagainandagainRequest] = {
    request.body.asJson
      .flatMap(Json.fromJson[tryagainandagainRequest](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
