# API Endpoint Generator

The **_generator_all.py_** and **_generator-all.js_** script generate a set of Scala files with boilerplate code for an endpoint in a Play Framework application. The generated files include controllers, request parsers, validators, connectors, and services, as well as their respective test files.

## Requirements

Node.js

## How to execute the script

Make sure you have Node.js installed on your system.

Navigate to the directory containing the **generator-all.js** scripts.

Run the script with the following command:

### Node.js:

```
node generator-all.js <EndpointName> [extension]
```

Replace <EndpointName> with the name of the endpoint you want to generate files for. Optionally, you can provide an [extension] that will be added to the generated folders' paths.

For example, to generate files for an endpoint named SampleEndpoint, run the following command:

### Node.js:

```
node generator-all.js SampleEndpoint
```

This will generate the following directory structure:

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
node generator-all.js SampleEndpoint v1
```

This will add /v1 to the generated folders' paths.

### Important notes

- The script will exit with an error if any of the files to be generated already exist.
- Make sure the provided EndpointName is in PascalCase (e.g., SampleEndpoint).
