import scala.concurrent.ExecutionContext.Implicits.global
import org.scalatest._
import org.scalatestplus.play._
import scala.concurrent.Await
import scala.concurrent.duration._

class UkNonFhlPropertyConnectorSpec extends PlaySpec {

  "UkNonFhlPropertyConnector" should {

    "return a successful UkNonFhlPropertyResponse" in {
      val request = UkNonFhlPropertyRequest("valid_value")
      val connector = new UkNonFhlPropertyConnector()

      val futureResult = connector.callAPI(request)

      val result = Await.result(futureResult, 5.seconds)

      result mustBe a[UkNonFhlPropertyResponse]
      // Add more assertions to check the response content if needed
    }
  }
}
