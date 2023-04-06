class WorkPleasesssssValidator @Inject()() {

  def validate(request: WorkPleasesssssRequest): Either[Error, WorkPleasesssssRequest] = {
    // Add your validation logic here
    Right(request)
  }
}
