import scala.concurrent.ExecutionContext.Implicits.global
import org.scalatest._
import org.scalatestplus.play._
import scala.concurrent.Await
import scala.concurrent.duration._

class UkNonFhlPropertyServiceSpec extends PlaySpec {

  "UkNonFhlPropertyService" should {

    "return a successful UkNonFhlPropertyResponse for a valid request" in {
      val request = UkNonFhlPropertyRequest("valid_value")
      val connector = new UkNonFhlPropertyConnector()
      val validator = new UkNonFhlPropertyValidator()
      val service = new UkNonFhlPropertyService(connector, validator)

      val futureResult = service.handleRequest(request)

      val result = Await.result(futureResult, 5.seconds)

      result mustBe a[Right[_, _]]
      result.right.get mustBe a[UkNonFhlPropertyResponse]
      // Add more assertions to check the response content if needed
    }

    "return an error for an invalid request" in {
      val request = UkNonFhlPropertyRequest("invalid_value")
      val connector = new UkNonFhlPropertyConnector()
      val validator = new UkNonFhlPropertyValidator()
      val service = new UkNonFhlPropertyService(connector, validator)

      val futureResult = service.handleRequest(request)

      val result = Await.result(futureResult, 5.seconds)

      result mustBe a[Left[_, _]]
      result.left.get.message must include("Invalid UkNonFhlPropertyRequest")
    }
  }
}
