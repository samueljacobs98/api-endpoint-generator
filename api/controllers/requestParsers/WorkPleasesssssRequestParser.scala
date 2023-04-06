import play.api.mvc._
import play.api.libs.json._

class WorkPleasesssssRequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, WorkPleasesssssRequest] = {
    request.body.asJson
      .flatMap(Json.fromJson[WorkPleasesssssRequest](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
