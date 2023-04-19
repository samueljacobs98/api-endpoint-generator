const ResponseDataScaffolder = {
  generateCode: (data) => {
    const { endpointName, packageName, subdirectory } = data

    const code = `
package ${subdirectory}.models.response.${packageName}

import play.api.libs.json.{Json, OFormat}

case class ${endpointName}Response(submissionId: String)

object ${endpointName}Response {

  implicit val format: OFormat[${endpointName}Response] = Json.format[${endpointName}Response]

}`;

    return code;
  },
};

module.exports = ResponseDataScaffolder;
