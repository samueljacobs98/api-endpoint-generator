class WorkPleasesssssssssValidator @Inject()() {

  def validate(request: WorkPleasesssssssssRequest): Either[Error, WorkPleasesssssssssRequest] = {
    // Add your validation logic here
    Right(request)
  }
}
