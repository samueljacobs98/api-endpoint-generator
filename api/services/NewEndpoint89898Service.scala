import scala.concurrent.Future

class NewEndpoint89898Service @Inject()(newendpoint89898Connector: NewEndpoint89898Connector, newendpoint89898Validator: NewEndpoint89898Validator) (implicit ec: ExecutionContext) {

  def handleRequest(request: NewEndpoint89898Request): Future[Either[Error, NewEndpoint89898Response]] = {
    newendpoint89898Validator.validate(request) match {
      case Left(error) => Future.successful(Left(error))
      case Right(validatedRequest) =>
        newendpoint89898Connector.callAPI(validatedRequest).map(response => Right(response))
    }
  }
}
