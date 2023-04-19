const rawDataFixture = `
package v2.models.request.endpointName

import api.models.request.RawData

case class EndpointNameRawData(nino: String) extends RawData`

module.exports = {
    rawDataFixture
}