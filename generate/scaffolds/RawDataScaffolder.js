const RawDataScaffolder = {
  generateCode: (endpointName) => {
    const packageName = endpointName.replace(/^(.)/, (_, p1) =>
      p1.toLowerCase()
    );

    const code = `
package v2.models.request.${packageName}

import api.models.request.RawData

case class ${endpointName}RawData(nino: String) extends RawData`;

    return code;
  },
};

module.exports = RawDataScaffolder;
