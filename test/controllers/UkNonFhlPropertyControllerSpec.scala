import play.api.mvc._
import play.api.test._
import play.api.test.Helpers._
import scala.concurrent.ExecutionContext
import org.scalatestplus.play._
import org.scalatestplus.play.guice._

class UkNonFhlPropertyControllerSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  implicit val ec: ExecutionContext = ExecutionContext.global

  "UkNonFhlPropertyController" should {

    "respond with 'not implemented yet' when called" in {
      val controller = new UkNonFhlPropertyController(stubControllerComponents())(ec)
      val result = controller.uknonfhlproperty().apply(FakeRequest(GET, "/"))

      status(result) mustBe OK
      contentType(result) mustBe Some("text/plain")
      contentAsString(result) must include("not implemented yet")
    }
  }
}
