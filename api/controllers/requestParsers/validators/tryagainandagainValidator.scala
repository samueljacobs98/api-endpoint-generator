class tryagainandagainValidator @Inject()() {

  def validate(request: tryagainandagainRequest): Either[Error, tryagainandagainRequest] = {
    // Add your validation logic here
    Right(request)
  }
}
