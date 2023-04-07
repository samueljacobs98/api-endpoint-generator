function generateCode(endpointName) {
  const code = `import play.api.mvc._
  import play.api.libs.json._
  import org.scalatest._
  import org.scalatestplus.play._
  import play.api.test.Helpers._
  
  class ${endpointName}RequestParserSpec extends PlaySpec {
  
    "${endpointName}RequestParser" should {
  
      "parse a valid JSON request" in {
        val json = Json.parse("{\\"your_field\\": \\"your_value\\"}")
        val request = FakeRequest().withBody(AnyContentAsJson(json))
        val parser = new ${endpointName}RequestParser()
  
        val result = parser.parse(request)
  
        result mustBe a[Right[_, _]]
        result.right.get.yourField mustBe "your_value"
      }
  
      "return an error for an invalid JSON request" in {
        val json = Json.parse("{\\"invalid_field\\": \\"invalid_value\\"}")
        val request = FakeRequest().withBody(AnyContentAsJson(json))
        val parser = new ${endpointName}RequestParser()
  
        val result = parser.parse(request)
  
        result mustBe a[Left[_, _]]
        result.left.get.message must include("Invalid JSON format")
      }
    }
  }
  `;

  return code;
}

module.exports = {
  EXT: "RequestParserSpec",
  generateCode,
};
