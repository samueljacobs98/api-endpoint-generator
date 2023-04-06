import scala.concurrent.Future

class tryagainandagainService @Inject()(tryagainandagainConnector: tryagainandagainConnector, tryagainandagainValidator: tryagainandagainValidator) (implicit ec: ExecutionContext) {

  def handleRequest(request: tryagainandagainRequest): Future[Either[Error, tryagainandagainResponse]] = {
    tryagainandagainValidator.validate(request) match {
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        tryagainandagainConnector.callAPI(validatedRequest).map(response => Right(response))
    }
  }
}
