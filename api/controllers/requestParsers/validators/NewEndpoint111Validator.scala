class NewEndpoint111Validator @Inject()() {

  def validate(request: NewEndpoint111Request): Either[Error, NewEndpoint111Request] = {
    // Add your validation logic here
    Right(request)
  }
}
