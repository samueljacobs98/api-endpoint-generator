const responseDataFixture = `
package v2.models.response.endpointName

import play.api.libs.json.{Json, OFormat}

case class EndpointNameResponse(submissionId: String)

object EndpointNameResponse {

  implicit val format: OFormat[EndpointNameResponse] = Json.format[EndpointNameResponse]

}`

module.exports = {
    responseDataFixture
}