# API Endpoint Generator

This is a Node.js command-line utility to generate Scala files for a given domain within a repository. It creates the specified components (e.g. controllers, services, validators, etc.) and their corresponding Spec (test) files for the given endpoint and domain.

## Requirements

Node.js

## Installation`

1. Clone the repository or download the files to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

## Usage

Run the following command in your terminal:

```
node generate <EndpointName> <Domain> [subdirectory]
```

Replace `<EndpointName>` with the name of the endpoint you want to generate files for. <Domain> with the desired domain (e.g. all, controllerAll, requestParserAll, etc.), and [subdirectory] with an optional subdirectory path for your generated files.

For example, to generate files for an endpoint named SampleEndpoint, run the following command:

```
node generate.js SamepleEndpoint all
```

## Code Structure

Generated components will be generated in the following directory structure:

```
app
  └─ controllers
      ├─ SampleEndpointController.scala
      └─ requestParsers
          ├─ SampleEndpointRequestParser.scala
          └─ validators
              └─ SampleEndpointValidator.scala
connectors
  └─ SampleEndpointConnector.scala
services
  └─ SampleEndpointService.scala
test
  └─ controllers
      ├─ SampleEndpointControllerSpec.scala
      └─ requestParsers
          ├─ SampleEndpointRequestParserSpec.scala
          └─ validators
              └─ SampleEndpointValidatorSpec.scala
  connectors
      └─ SampleEndpointConnectorSpec.scala
  services
      └─ SampleEndpointServiceSpec.scala
```

If you want to add an [extension], for example, /v1, run:

### Node.js:

```
node generator-all.js SampleEndpoint all v1
```

This will add /v1 to the generated folders' paths.

```
i.e. app/v1/controllers/SampleEndpointController.scala
```

## Domains

The available domains are:

- `all`: Generates all components and Spec files.
- `controllerAll`: Generates controller and controller Spec files.
- `requestParserAll`: Generates request parser and request parser Spec files.
- `validatorAll`: Generates validator and validator Spec files.
- `connectorAll`: Generates connector and connector Spec files.
- `serviceAll`: Generates service and service Spec files.

## Components

The generated components include:

- Controller
- Request Parser
- Validator
- Connector
- Service
- For each component, a corresponding Spec (test) file is also generated.

## Customisation

To add or modify components, you can update the `components.js` file. To add or modify domains, update the `domain.js` file.

### Important notes

- The content of the generated files is hardcoded. You can customize the content by modifying the Component.js and SpecComponent.js files.
- The script will exit with an error if any of the files to be generated already exist.
- Make sure the provided EndpointName is in PascalCase (e.g., SampleEndpoint).
- The user must provide the desired root location of the repository when prompted by the script.
