import play.api.mvc._
import play.api.libs.json._

class WorkPleaseRequestParser @Inject()() {

  def parse(request: Request[AnyContent]): Either[Error, WorkPleaseRequest] = {
    request.body.asJson
      .flatMap(Json.fromJson[WorkPleaseRequest](_).asOpt)
      .toRight(Error("Invalid JSON format"))
  }
}
