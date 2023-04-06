import scala.concurrent.Future

class WorkPleasesssssService @Inject()(workpleasesssssConnector: WorkPleasesssssConnector, workpleasesssssValidator: WorkPleasesssssValidator) (implicit ec: ExecutionContext) {

  def handleRequest(request: WorkPleasesssssRequest): Future[Either[Error, WorkPleasesssssResponse]] = {
    workpleasesssssValidator.validate(request) match {
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        workpleasesssssConnector.callAPI(validatedRequest).map(response => Right(response))
    }
  }
}
