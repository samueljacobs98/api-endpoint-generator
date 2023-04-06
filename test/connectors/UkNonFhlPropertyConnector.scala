import scala.concurrent.Future

class UkNonFhlPropertyConnector @Inject()()(implicit ec: ExecutionContext) {

  def callAPI(request: UkNonFhlPropertyRequest): Future[UkNonFhlPropertyResponse] = {
    // Add your API call implementation here
    Future.successful(UkNonFhlPropertyResponse("Not implemented yet"))
  }
}
