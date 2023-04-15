const ResponseDataScaffolder = {
  generateCode: (endpointName) => {
    const packageName = endpointName.replace(/^(.)/, (_, p1) =>
      p1.toLowerCase()
    );

    const code = `
package v2.models.response.${packageName}

import play.api.libs.json.{Json, OFormat}

case class ${endpointName}Response(submissionId: String)

object ${endpointName}Response {

implicit val format: OFormat[${endpointName}Response] = Json.format[${endpointName}Response]

}`;

    return code;
  },
};

module.exports = ResponseDataScaffolder;
