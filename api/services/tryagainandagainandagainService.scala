import scala.concurrent.Future

class tryagainandagainandagainService @Inject()(tryagainandagainandagainConnector: tryagainandagainandagainConnector, tryagainandagainandagainValidator: tryagainandagainandagainValidator) (implicit ec: ExecutionContext) {

  def handleRequest(request: tryagainandagainandagainRequest): Future[Either[Error, tryagainandagainandagainResponse]] = {
    tryagainandagainandagainValidator.validate(request) match {
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        tryagainandagainandagainConnector.callAPI(validatedRequest).map(response => Right(response))
    }
  }
}
