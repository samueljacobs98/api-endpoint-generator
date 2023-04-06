import play.api.mvc._
import play.api.libs.json._

class WorkPleasesssssssssRequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, WorkPleasesssssssssRequest] = {
    request.body.asJson
      .flatMap(Json.fromJson[WorkPleasesssssssssRequest](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
