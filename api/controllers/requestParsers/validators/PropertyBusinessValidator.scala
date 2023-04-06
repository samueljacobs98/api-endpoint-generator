class PropertyBusinessValidator @Inject()() {

  def validate(request: PropertyBusinessRequest): Either[Error, PropertyBusinessRequest] = {
    // Add your validation logic here
    Right(request)
  }
}
