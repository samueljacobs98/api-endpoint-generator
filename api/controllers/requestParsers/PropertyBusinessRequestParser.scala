import play.api.mvc._
import play.api.libs.json._

class PropertyBusinessRequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, PropertyBusinessRequest] = {
    request.body.asJson
      .flatMap(Json.fromJson[PropertyBusinessRequest](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
