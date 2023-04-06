import scala.concurrent.Future

class NewEndpoint111Service @Inject()(newendpoint111Connector: NewEndpoint111Connector, newendpoint111Validator: NewEndpoint111Validator) (implicit ec: ExecutionContext) {

  def handleRequest(request: NewEndpoint111Request): Future[Either[Error, NewEndpoint111Response]] = {
    newendpoint111Validator.validate(request) match {
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        newendpoint111Connector.callAPI(validatedRequest).map(response => Right(response))
    }
  }
}
