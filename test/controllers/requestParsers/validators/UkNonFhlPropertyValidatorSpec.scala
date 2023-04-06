import org.scalatest._
import org.scalatestplus.play._

class UkNonFhlPropertyValidatorSpec extends PlaySpec {

  "UkNonFhlPropertyValidator" should {

    "validate a correct UkNonFhlPropertyRequest" in {
      val request = UkNonFhlPropertyRequest("valid_value")
      val validator = new UkNonFhlPropertyValidator()

      val result = validator.validate(request)

      result mustBe a[Right[_, _]]
      result.right.get mustBe request
    }

    "return an error for an incorrect UkNonFhlPropertyRequest" in {
      val request = UkNonFhlPropertyRequest("invalid_value")
      val validator = new UkNonFhlPropertyValidator()

      val result = validator.validate(request)

      result mustBe a[Left[_, _]]
      result.left.get.message must include("Invalid UkNonFhlPropertyRequest")
    }
  }
}
