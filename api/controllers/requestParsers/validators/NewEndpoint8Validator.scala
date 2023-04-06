class NewEndpoint8Validator @Inject()() {

  def validate(request: NewEndpoint8Request): Either[Error, NewEndpoint8Request] = {
    // Add your validation logic here
    Right(request)
  }
}
