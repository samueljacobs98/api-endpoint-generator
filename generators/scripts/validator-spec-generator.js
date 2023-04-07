function generateCode(endpointName) {
  const code = `import org.scalatest._
  import org.scalatestplus.play._
  
  class ${endpointName}ValidatorSpec extends PlaySpec {
  
    "${endpointName}Validator" should {
  
      "validate a correct ${endpointName}Request" in {
        val request = new ${endpointName}Request("valid_value")
        val validator = new ${endpointName}Validator()
  
        val result = validator.validate(request)
  
        result mustBe a[Right[_, _]]
        result.right.get mustBe request
      }
  
      "return an error for an incorrect ${endpointName}Request" in {
        val request = new ${endpointName}Request("invalid_value")
        val validator = new ${endpointName}Validator()
  
        val result = validator.validate(request)
  
        result mustBe a[Left[_, _]]
        result.left.get.message must include("Invalid ${endpointName}Request")
      }
    }
  }
  `;

  return code;
}

module.exports = {
  EXT: "ValidatorSpec",
  generateCode,
};
