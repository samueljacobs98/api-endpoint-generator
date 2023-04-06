class WorkPleaseValidator @Inject()() {

  def validate(request: WorkPleaseRequest): Either[Error, WorkPleaseRequest] = {
    // Add your validation logic here
    Right(request)
  }
}
