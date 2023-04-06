class UkNonFhlPropertyValidator @Inject()() {

  def validate(request: UkNonFhlPropertyRequest): Either[Error, UkNonFhlPropertyRequest] = {
    // Add your validation logic here
    Right(request)
  }
}
