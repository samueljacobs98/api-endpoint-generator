import scala.concurrent.Future

class UkNonFhlPropertyService @Inject()(uknonfhlpropertyConnector: UkNonFhlPropertyConnector, uknonfhlpropertyValidator: UkNonFhlPropertyValidator) (implicit ec: ExecutionContext) {

  def handleRequest(request: UkNonFhlPropertyRequest): Future[Either[Error, UkNonFhlPropertyResponse]] = {
    uknonfhlpropertyValidator.validate(request) match {
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        uknonfhlpropertyConnector.callAPI(validatedRequest).map(response => Right(response))
    }
  }
}
