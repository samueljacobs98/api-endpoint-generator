class NewEndpointAgainValidator @Inject()() {

  def validate(request: NewEndpointAgainRequest): Either[Error, NewEndpointAgainRequest] = {
    // Add your validation logic here
    Right(request)
  }
}
