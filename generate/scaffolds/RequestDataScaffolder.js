const RequestDataScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data

    const code = `
package ${subdirectory}.models.request.${packageName}

import api.models.domain.Nino

case class ${endpointName}Request(nino: Nino)`;

    return code;
  },
};

module.exports = RequestDataScaffolder;
