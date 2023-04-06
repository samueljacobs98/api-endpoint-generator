import scala.concurrent.Future

class PropertyBusinessService @Inject()(propertybusinessConnector: PropertyBusinessConnector, propertybusinessValidator: PropertyBusinessValidator) (implicit ec: ExecutionContext) {

  def handleRequest(request: PropertyBusinessRequest): Future[Either[Error, PropertyBusinessResponse]] = {
    propertybusinessValidator.validate(request) match {
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        propertybusinessConnector.callAPI(validatedRequest).map(response => Right(response))
    }
  }
}
