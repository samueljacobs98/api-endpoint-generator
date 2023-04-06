# generate_all.py

import os
import sys
import importlib.util

def generate_code(output_directory, endpoint_name, ext, code):
    file_name = f"{output_directory}/{endpoint_name}{ext}.scala"

    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    if os.path.exists(file_name):
        print(f"Error: File '{file_name}' already exists.")
        sys.exit(1)

    with open(file_name, "w") as f:
        f.write(code)

    print(f"Generated {file_name}")

def import_module(script_path):
    module_name = os.path.splitext(os.path.basename(script_path))[0]
    spec = importlib.util.spec_from_file_location(module_name, script_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

def main():
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("Usage: python3 generate_all.py <EndpointName> [extension]")
        sys.exit(1)

    endpoint_name = sys.argv[1]
    extension = "/" + sys.argv[2] if len(sys.argv) == 3 else ""

    script_paths = [
        "./scripts/controller_generator.py",
        "./scripts/requestParser_generator.py",
        "./scripts/validator_generator.py",
        "./scripts/connector_generator.py",
        "./scripts/service_generator.py",
        "./scripts/controllerSpec_generator.py",
        "./scripts/requestParserSpec_generator.py",
        "./scripts/validatorSpec_generator.py",
        "./scripts/connectorSpec_generator.py",
        "./scripts/serviceSpec_generator.py"
    ]

    output_directories = [
        f"../app{extension}/controllers",
        f"../app{extension}/controllers/requestParsers",
        f"../app{extension}/controllers/requestParsers/validators",
        f"../app{extension}/connectors",
        f"../app{extension}/services",
        f"../test{extension}/controllers",
        f"../test{extension}/controllers/requestParsers",
        f"../test{extension}/controllers/requestParsers/validators",
        f"../test{extension}/connectors",
        f"../test{extension}/services"
    ]

    components = [import_module(script_path) for script_path in script_paths]

    for component, output_directory in zip(components, output_directories):
        code = component.generate_code(endpoint_name)
        generate_code(output_directory, endpoint_name, component.EXT, code)

if __name__ == "__main__":
    main()
