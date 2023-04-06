import play.api.mvc._
import play.api.libs.json._

class WorkPleasesRequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, WorkPleasesRequest] = {
    request.body.asJson
      .flatMap(Json.fromJson[WorkPleasesRequest](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
