class WorkPleasesValidator @Inject()() {

  def validate(request: WorkPleasesRequest): Either[Error, WorkPleasesRequest] = {
    // Add your validation logic here
    Right(request)
  }
}
