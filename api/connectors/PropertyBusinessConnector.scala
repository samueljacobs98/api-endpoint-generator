import scala.concurrent.Future

class PropertyBusinessConnector @Inject()()(implicit ec: ExecutionContext) {

  def callAPI(request: PropertyBusinessRequest): Future[PropertyBusinessResponse] = {
    // Add your API call implementation here
    Future.successful(PropertyBusinessResponse("Not implemented yet"))
  }
}
