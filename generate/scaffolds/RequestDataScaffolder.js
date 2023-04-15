const RequestDataScaffolder = {
  generateCode: (endpointName) => {
    const packageName = endpointName.replace(/^(.)/, (_, p1) =>
      p1.toLowerCase()
    );

    const code = `
package v2.models.request.${packageName}

import api.models.domain.Nino

case class ${endpointName}Request(nino: Nino)`;

    return code;
  },
};

module.exports = RequestDataScaffolder;
