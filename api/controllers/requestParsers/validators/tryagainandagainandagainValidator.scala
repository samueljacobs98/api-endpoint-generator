class tryagainandagainandagainValidator @Inject()() {

  def validate(request: tryagainandagainandagainRequest): Either[Error, tryagainandagainandagainRequest] = {
    // Add your validation logic here
    Right(request)
  }
}
