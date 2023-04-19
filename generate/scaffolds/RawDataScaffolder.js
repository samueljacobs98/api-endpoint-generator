const RawDataScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data

    const code = `
package ${subdirectory}.models.request.${packageName}

import api.models.request.RawData

case class ${endpointName}RawData(nino: String) extends RawData`;

    return code;
  },
};

module.exports = RawDataScaffolder;
