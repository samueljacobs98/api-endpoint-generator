function generateCode(endpointName) {
  const code = `import scala.concurrent.ExecutionContext.Implicits.global
  import org.scalatest._
  import org.scalatestplus.play._
  import scala.concurrent.Await
  import scala.concurrent.duration._
  
  class ${endpointName}ServiceSpec extends PlaySpec {
  
    "${endpointName}Service" should {
  
      "return a successful ${endpointName}Response for a valid request" in {
        val request = ${endpointName}Request("valid_value")
        val connector = new ${endpointName}Connector()
        val validator = new ${endpointName}Validator()
        val service = new ${endpointName}Service(connector, validator)
  
        val futureResult = service.handleRequest(request)
  
        val result = Await.result(futureResult, 5.seconds)
  
        result mustBe a[Right[_, _]]
        result.right.get mustBe a[${endpointName}Response]
        // Add more assertions to check the response content if needed
      }
  
      "return an error for an invalid request" in {
        val request = ${endpointName}Request("invalid_value")
        val connector = new ${endpointName}Connector()
        val validator = new ${endpointName}Validator()
        val service = new ${endpointName}Service(connector, validator)
  
        val futureResult = service.handleRequest(request)
  
        val result = Await.result(futureResult, 5.seconds)
  
        result mustBe a[Left[_, _]]
        result.left.get.message must include("Invalid ${endpointName}Request")
      }
    }
  }
  `;

  return code;
}

module.exports = {
  EXT: "ServiceSpec",
  generateCode,
};
