import subprocess
import os
import json
from typing import List, Tuple
from .utils import normalize_composition

CIRCUITS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "circuits")

def generate_simple_hash(composition: List[int]) -> int:
    """Generate a simple hash for testing purposes"""
    # Just sum all values and multiply by a prime number
    return sum(composition) * 31

def run_noir_proof(composition: List[int], composition_index: int, threshold: int) -> Tuple[bool, str]:
    """
    Run the Noir proof verification as a subprocess.
    Returns a tuple of (success, message)
    """
    try:
        print(f"Debug - Input values: composition={composition}, index={composition_index}, threshold={threshold}")
        
        # Generate hash commitment
        hash_commitment = generate_simple_hash(composition)
        print(f"Debug - Generated hash commitment: {hash_commitment}")
        
        # Create Prover.toml with the input data
        prover_data = f"""# Prover.toml
composition = {composition}
composition_index = {composition_index}
threshold = {threshold}
hash_commitment = {hash_commitment}
"""
        
        prover_path = os.path.join(CIRCUITS_DIR, "Prover.toml")
        with open(prover_path, "w") as f:
            f.write(prover_data)
        print(f"Debug - Created Prover.toml at {prover_path}")
        
        # Run nargo execute
        print("Debug - Running nargo execute...")
        result = subprocess.run(
            ["nargo", "execute"],
            cwd=CIRCUITS_DIR,
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            error_msg = result.stderr
            if "Failed constraint" in error_msg and "assert(value < threshold)" in error_msg:
                print(f"Debug - Threshold constraint failed: value at index {composition_index} is not less than threshold {threshold}")
                return False, f"Value at index {composition_index} is not less than threshold {threshold}"
            print(f"Debug - Proof execution failed: {error_msg}")
            return False, f"Proof execution failed: {error_msg}"
            
        print("Debug - Proof executed successfully")
        return True, "Proof executed successfully"
        
    except Exception as e:
        print(f"Debug - Error: {str(e)}")
        return False, f"Error running Noir proof: {str(e)}" 