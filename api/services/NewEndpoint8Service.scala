import scala.concurrent.Future

class NewEndpoint8Service @Inject()(newendpoint8Connector: NewEndpoint8Connector, newendpoint8Validator: NewEndpoint8Validator) (implicit ec: ExecutionContext) {

  def handleRequest(request: NewEndpoint8Request): Future[Either[Error, NewEndpoint8Response]] = {
    newendpoint8Validator.validate(request) match {
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        newendpoint8Connector.callAPI(validatedRequest).map(response => Right(response))
    }
  }
}
