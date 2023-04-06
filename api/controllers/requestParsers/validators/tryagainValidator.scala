class tryagainValidator @Inject()() {

  def validate(request: tryagainRequest): Either[Error, tryagainRequest] = {
    // Add your validation logic here
    Right(request)
  }
}
