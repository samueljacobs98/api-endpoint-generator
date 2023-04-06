class NewEndpoint89898Validator @Inject()() {

  def validate(request: NewEndpoint89898Request): Either[Error, NewEndpoint89898Request] = {
    // Add your validation logic here
    Right(request)
  }
}
