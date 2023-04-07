function generateCode(endpointName) {
  const code = `import scala.concurrent.ExecutionContext.Implicits.global;
  import org.scalatest._;
  import org.scalatestplus.play._;
  import scala.concurrent.Await;
  import scala.concurrent.duration._;
  
  class ${endpointName}ConnectorSpec extends PlaySpec {
  
    "${endpointName}Connector" should {
  
      "return a successful ${endpointName}Response" in {
        val request = ${endpointName}Request("valid_value");
        val connector = new ${endpointName}Connector();
  
        val futureResult = connector.callAPI(request);
  
        val result = Await.result(futureResult, 5.seconds);
  
        result mustBe a[${endpointName}Response];
        // Add more assertions to check the response content if needed
      }
    }
  }
  `;

  return code;
}

module.exports = {
  EXT: "ConnectorSpec",
  generateCode,
};
