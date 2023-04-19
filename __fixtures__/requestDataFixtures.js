const requestDataFixture = `
package v2.models.request.endpointName

import api.models.domain.Nino

case class EndpointNameRequest(nino: Nino)`

module.exports = {
    requestDataFixture
}