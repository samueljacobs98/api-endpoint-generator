import scala.concurrent.Future

class WorkPleasesssssssssService @Inject()(workpleasesssssssssConnector: WorkPleasesssssssssConnector, workpleasesssssssssValidator: WorkPleasesssssssssValidator) (implicit ec: ExecutionContext) {

  def handleRequest(request: WorkPleasesssssssssRequest): Future[Either[Error, WorkPleasesssssssssResponse]] = {
    workpleasesssssssssValidator.validate(request) match {
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        workpleasesssssssssConnector.callAPI(validatedRequest).map(response => Right(response))
    }
  }
}
