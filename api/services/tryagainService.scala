import scala.concurrent.Future

class tryagainService @Inject()(tryagainConnector: tryagainConnector, tryagainValidator: tryagainValidator) (implicit ec: ExecutionContext) {

  def handleRequest(request: tryagainRequest): Future[Either[Error, tryagainResponse]] = {
    tryagainValidator.validate(request) match {
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        tryagainConnector.callAPI(validatedRequest).map(response => Right(response))
    }
  }
}
