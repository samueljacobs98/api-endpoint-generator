# API Endpoint Generator

This is a Node.js command-line utility to generate Scala files for a given domain within a repository. It creates the specified components (e.g. controllers, services, validators, etc.) and their corresponding Spec (test) files for the given endpoint and domain.

## Requirements

Node.js

## Installation

1. Clone the repository or download the files to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

## Set up for global usage
1. Run `npm link` to create a global symlink for the project.
2. Verify that the symlink was created successfully by running the following command: `npm ls -g --depth=0`. You should see your project listed in the output.

## Usage

Run the following command in your terminal:

```
generate <EndpointName> <Domain> [subdirectory]
```

Replace `<EndpointName>` with the name of the endpoint you want to generate files for, `<Domain>` with the desired domain (e.g. all, controllerAll, requestParserAll, etc.), and `[subdirectory]` with an optional subdirectory path for your generated files.

For example, to generate all necessary files for an endpoint named SampleEndpoint, run the following command:

```
generate SampleEndpoint all
```

## Code Structure

Generated components will be generated in the following directory structure:

```
.
├── app
│   ├── connectors
│   │   └── SampleEndpointConnector.scala
│   ├── controllers
│   │   ├── SampleEndpointController.scala
│   │   └── requestParsers
│   │       ├── SampleEndpointRequestParser.scala
│   │       └── validators
│   │           └── SampleEndpointValidator.scala
│   ├── models
│   │   ├── request
│   │   │   ├── SampleEndpointRawData.scala
│   │   │   └── SampleEndpointRequest.scala
│   │   └── response
│   │       └── SampleEndpointResponse.scala
│   └── services
│       └── SampleEndpointService.scala
└── test
    ├── connectors
    │   └── SampleEndpointConnectorSpec.scala
    ├── controllers
    │   ├── SampleEndpointControllerSpec.scala
    │   └── requestParsers
    │       ├── SampleEndpointRequestParserSpec.scala
    │       └── validators
    │           └── SampleEndpointValidatorSpec.scala
    ├── mocks
    │   ├── MockSampleEndpointConnector.scala
    │   ├── MockSampleEndpointRequestParser.scala
    │   ├── MockSampleEndpointService.scala
    │   └── MockSampleEndpointValidator.scala
    └── services
        └── SampleEndpointServiceSpec.scala
```

If you want to add an `[extension]`, for example, `/v1`, run:

### Node.js:

```
node generator SampleEndpoint all v1
```

This will add /v1 to the generated folders' paths.

```
i.e. app/v1/controllers/SampleEndpointController.scala
```

## Domains

The available domains are:

- `all`: Generates all component, Spec and Mock files.
- `controllerAll`: Generates controller and controller Spec files.
- `requestParserAll`: Generates request parser and request parser Spec files.
- `validatorAll`: Generates validator and validator Spec files.
- `connectorAll`: Generates connector and connector Spec files.
- `serviceAll`: Generates service and service Spec files.
- `dataAll`: Generates data model files.
- `mocks`: Generates test mock files.

## Components

The generated components include:

- Controller + ControllerSpec
- Request Parser + RequestParserSpec
- Validator + ValidatorSpec
- Connector + ConnectorSpec
- Service + ServiceSpec
- Models:
  - RawData
  - Request
  - Response
- Mocks:
  - MockConnector
  - MockRequestParser
  - MockService
  - MockValidator

### Important notes

- The content of the generated files is hardcoded.
- The script will exit with an error if any of the files to be generated already exist.
- Make sure the provided EndpointName is in PascalCase (e.g., SampleEndpoint).
- The user must provide the desired root location of the repository when prompted by the script.
