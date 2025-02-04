#!/usr/bin/env python3
import json
import os
from pathlib import Path

def updateAbis():
    contract_names = [
        "HoneyLocker", 
        "LockerFactory",
        "HoneyQueen",
        "KodiakAdapter",
        "BeradromeAdapter",
        "InfraredAdapter",
        "BGTStationAdapter",
    ]

    abi_dir = Path("abi")
    abi_dir.mkdir(exist_ok=True)

    current_dir = os.getcwd()
    interpol_dir = Path(current_dir).parent / "interpol"

    for name in contract_names:
        input_path = interpol_dir / "out" / f"{name}.sol" / f"{name}.json"
        try:
            # Read the input JSON file
            with open(input_path, 'r') as f:
                data = json.load(f)
                abi = data.get('abi')
                if abi is None:
                    print(f"Warning: No ABI found in {input_path}")
                    continue
                
                # Output file path
                output_path = abi_dir / f"{name}.json"
                
                # Write the ABI as json file
                with open(output_path, 'w') as f:
                    json.dump(abi, f, indent=2)
                    
                print(f"Successfully extracted ABI for {name}")
                
        except FileNotFoundError:
            print(f"Error: Could not find file {input_path}")
        except json.JSONDecodeError:
            print(f"Error: Invalid JSON in {input_path}")
        except Exception as e:
            print(f"Error processing {name}: {str(e)}")

def updateAddresses():
    # Read addresses file
    contracts_file = Path("src/addresses.ts")

    current_dir = os.getcwd()
    interpol_dir = Path(current_dir).parent / "interpol"

    # Read testnet config
    config_path = interpol_dir / "script" / "mainnet.config.json"
    with open(config_path) as f:
        config = json.load(f)

    # Get addresses from config
    honeyqueen_addr = config["honeyqueen"]
    factory_addr = config["lockerFactory"]

    print(f"Honeyqueen address: {honeyqueen_addr}")
    print(f"Factory address: {factory_addr}")

    with open(contracts_file) as f:
        content = f.read()

    # Update addresses using regex
    import re
    content = re.sub(r'(LOCKER_FACTORY_ADDRESS = )"[^"]*"', f'\\1"{factory_addr}"', content)
    content = re.sub(r'(HONEYQUEEN_ADDRESS = )"[^"]*"', f'\\1"{honeyqueen_addr}"', content)
    # Write updated content
    with open(contracts_file, 'w') as f:
        f.write(content)

    print("Successfully updated addresses")

if __name__ == "__main__":
    updateAbis()
    updateAddresses()
    try:
        import subprocess
        print("Running sqd commands...")
        subprocess.run(["sqd", "codegen"], check=True)
        subprocess.run(["sqd", "typegen"], check=True)
        print("Successfully ran sqd commands")
    except subprocess.CalledProcessError as e:
        print(f"Error running sqd commands: {e}")
    except Exception as e:
        print(f"Unexpected error running sqd commands: {e}")