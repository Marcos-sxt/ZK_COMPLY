import hashlib
from typing import List

def normalize_composition(composition: List[int]) -> List[int]:
    """Normalize composition to have 30 elements and sum to 100000"""
    # Pad with zeros to get 30 elements
    normalized = composition + [0] * (30 - len(composition))
    
    # Calculate current sum
    current_sum = sum(normalized)
    
    # If sum is 0, set first element to 100000
    if current_sum == 0:
        normalized[0] = 100000
        return normalized
    
    # Scale values to sum to 100000
    scale_factor = 100000 / current_sum
    normalized = [int(x * scale_factor) for x in normalized]
    
    # Adjust last element to ensure exact sum of 100000
    normalized[-1] = 100000 - sum(normalized[:-1])
    
    return normalized

def generate_commitment_hash(name: str, composition: List[int]) -> str:
    # Normalize composition first
    normalized = normalize_composition(composition)
    # Use the normalized composition for hash
    fake_string = name + ''.join(map(str, normalized))
    return hashlib.sha256(fake_string.encode()).hexdigest() 