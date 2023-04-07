function generateCode(endpointName) {
  const code = `import play.api.mvc._
import play.api.test._
import play.api.test.Helpers._
import scala.concurrent.ExecutionContext
import org.scalatestplus.play._
import org.scalatestplus.play.guice._

class ${endpointName}ControllerSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  implicit val ec: ExecutionContext = ExecutionContext.global

  "${endpointName}Controller" should {

    "respond with 'not implemented yet' when called" in {
      val controller = new ${endpointName}Controller(stubControllerComponents())(ec)
      val result = controller.${endpointName.toLowerCase()}().apply(FakeRequest(GET, "/"))

      status(result) mustBe OK
      contentType(result) mustBe Some("text/plain")
      contentAsString(result) must include("not implemented yet")
    }
  }
}
`;

  return code;
}

module.exports = {
  EXT: "ControllerSpec",
  generateCode,
};
