# generate_all.py

import os
import sys
import subprocess

scripts = [
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

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 generate_all.py <EndpointName>")
        sys.exit(1)

    endpoint_name = sys.argv[1]

    for script in scripts:
        if not os.path.isfile(script):
            print(f"Error: '{script}' not found. Please ensure all required scripts are in the same directory.")
            sys.exit(1)

        process = subprocess.run(["python3", script, endpoint_name])

        if process.returncode != 0:
            print(f"Error: '{script}' failed to execute.")
            sys.exit(1)

        print(f"Executed {script}")

if __name__ == "__main__":
    main()
