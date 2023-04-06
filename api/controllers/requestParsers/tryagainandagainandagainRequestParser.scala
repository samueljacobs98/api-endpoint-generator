import play.api.mvc._
import play.api.libs.json._

class tryagainandagainandagainRequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, tryagainandagainandagainRequest] = {
    request.body.asJson
      .flatMap(Json.fromJson[tryagainandagainandagainRequest](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
