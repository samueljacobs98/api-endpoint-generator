import play.api.mvc._
import play.api.libs.json._

class UkNonFhlPropertyRequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, UkNonFhlPropertyRequest] = {
    request.body.asJson
      .flatMap(Json.fromJson[UkNonFhlPropertyRequest](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
